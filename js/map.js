import { createCardElement } from './announcement.js';
import { getData } from './api.js';
import { ANNOUNCEMENT_COUNT, getMapInitValues, getPrice } from './consts.js';
import { createAnnouncements } from './data.js';
import { address, mapCanvas, mapFilterList, mapFilters } from './elems.js';
import { switchFormState } from './form.js';
import { showAlert, switchDisabled } from './util.js';

let map;
let markerGroup;
const MAP_INIT_VALUES = getMapInitValues();

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
  createMarkers(announcements.slice(0, ANNOUNCEMENT_COUNT));
};

const updateMarkers = (announcements) => {
  mapFilters.addEventListener('change', (evt) => {
    const target = evt.target;
    let newAnnouncement = announcements.slice();

    mapFilterList.forEach((fieldset) => {
      if (fieldset.value !== 'any') {
        if (fieldset.matches('#housing-type')) {
          newAnnouncement = newAnnouncement
            .filter((el) => el.offer.type === fieldset.value);
        }

        if (fieldset.matches('#housing-price')) {
          const PRICE = getPrice();

          newAnnouncement = newAnnouncement
            .filter((el) => el.offer.price >= PRICE[fieldset.value].min && el.offer.price <= PRICE[fieldset.value].max);
        }

        if (fieldset.matches('#housing-rooms')) {
          newAnnouncement = newAnnouncement
            .filter((el) => +el.offer.rooms === +fieldset.value);
        }

        if (fieldset.matches('#housing-guests')) {
          newAnnouncement = newAnnouncement
            .filter((el) => +el.offer.guests === +fieldset.value);
        }

        if (fieldset.matches('#housing-features')) {
          const inputs = fieldset.querySelectorAll('input');

          inputs.forEach((input) => {
            if (input.checked) {
              newAnnouncement = newAnnouncement
                .filter((el) => el.offer.features?.includes(input.value));
            }
          });
        }
      }
    });

    markerGroup.clearLayers();
    createMarkers(newAnnouncement.slice(0, ANNOUNCEMENT_COUNT));
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
  updateMarkers,
  loadMap,
};
