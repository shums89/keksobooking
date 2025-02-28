import { createCardElement } from './announcement.js';
import { getData } from './api.js';
import { ANNOUNCEMENT_COUNT, getMapInitValues, getPrice, RERENDER_DELAY } from './consts.js';
import { createAnnouncements } from './data.js';
import { address, mapCanvas, mapFilterList, mapFilters } from './elems.js';
import { switchFormState } from './form.js';
import { debounce, showAlert, switchDisabled } from './util.js';

let map;
let markerGroup;
const MAP_INIT_VALUES = getMapInitValues();

const compareFeatures = (featuresA, featuresB) => {
  const rankA = featuresA.offer.features?.length || 0;
  const rankB = featuresB.offer.features?.length || 0;

  return rankB - rankA;
}

const switchMapState = (active = true) => {
  mapFilters.reset();
  switchDisabled(mapFilterList, !active);

  if (active) {
    mapFilters.classList.remove('map__filters--disabled');
  } else {
    mapCanvas.innerHTML = '';
    mapFilters.classList.add('map__filters--disabled');
  }
};

const createMainMarker = () => {
  const mainPinIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const mainPinMarker = L.marker(
    {
      lat: MAP_INIT_VALUES.lat,
      lng: MAP_INIT_VALUES.lng,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  mainPinMarker.addTo(map);
  address.value = `${MAP_INIT_VALUES.lat.toFixed(5)}, ${MAP_INIT_VALUES.lng.toFixed(5)}`;

  mainPinMarker.on('move', (evt) => {
    const coordinates = evt.target.getLatLng();

    address.value = `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;
  });
};

const createMarkers = (announcements) => {
  const icon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  markerGroup = L.layerGroup().addTo(map);

  const createMarker = (announcement) => {
    const { lat, lng } = announcement.location;

    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon,
      },
    );

    marker
      .addTo(markerGroup)
      .bindPopup(createCardElement(announcement));
  };

  announcements.forEach((announcement) => {
    createMarker(announcement);
  });
};

const renderMarkers = (announcements) => {
  markerGroup?.clearLayers();

  createMarkers(
    announcements
      .slice()
      .sort(compareFeatures)
      .slice(0, ANNOUNCEMENT_COUNT)
  );
};

const debouncedRender = debounce(renderMarkers, RERENDER_DELAY);

const createMap = (announcements) => {
  map = L.map('map-canvas')
    .on('load', () => {
      switchMapState(true);
      switchFormState(true);
    }).setView({
      lat: MAP_INIT_VALUES.lat,
      lng: MAP_INIT_VALUES.lng,
    }, MAP_INIT_VALUES.zoom);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  createMainMarker();
  renderMarkers(announcements);
};

const updateMarkers = (announcements) => {
  mapFilters.addEventListener('change', () => {
    let filteredAnnouncements = announcements.slice();

    mapFilterList.forEach((fieldset) => {
      if (fieldset.value !== 'any') {
        if (fieldset.matches('#housing-type')) {
          filteredAnnouncements = filteredAnnouncements
            .filter((el) => el.offer.type === fieldset.value);
        }

        if (fieldset.matches('#housing-price')) {
          const PRICE = getPrice();

          filteredAnnouncements = filteredAnnouncements
            .filter((el) => el.offer.price >= PRICE[fieldset.value].min && el.offer.price <= PRICE[fieldset.value].max);
        }

        if (fieldset.matches('#housing-rooms')) {
          filteredAnnouncements = filteredAnnouncements
            .filter((el) => +el.offer.rooms === +fieldset.value);
        }

        if (fieldset.matches('#housing-guests')) {
          filteredAnnouncements = filteredAnnouncements
            .filter((el) => +el.offer.guests === +fieldset.value);
        }

        if (fieldset.matches('#housing-features')) {
          const inputs = fieldset.querySelectorAll('input');

          inputs.forEach((input) => {
            if (input.checked) {
              filteredAnnouncements = filteredAnnouncements
                .filter((el) => el.offer.features?.includes(input.value));
            }
          });
        }
      }
    });

    debouncedRender(filteredAnnouncements);
  });
};

const loadMap = () => {
  map?.remove();

  getData(
    (announcements) => {
      createMap(announcements);
      updateMarkers(announcements);
    },
    () => {
      const announcements = createAnnouncements();

      createMap(announcements);
      updateMarkers(announcements);

      showAlert('Ошибка при загрузке данных. Будут использованы тестовые данные!');
    }
  );
};

export {
  switchMapState,
  createMap,
  loadMap,
};
