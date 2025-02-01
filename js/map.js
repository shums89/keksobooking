import { switchDisabled } from './util.js';

const map = document.querySelector('.map');
const mapCanvas = map.querySelector('#map-canvas');
const mapFilters = map.querySelector('.map__filters');
const mapFilterList = mapFilters.querySelectorAll('[id^="housing-"]');

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

export { switchMapState };
