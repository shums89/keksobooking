import { switchDisabled } from './util.js';

const map = document.querySelector('.map');
const mapCanvas = map.querySelector('#map-canvas');
const mapFilters = map.querySelector('.map__filters');
const mapFilterList = mapFilters.querySelectorAll('[id^="housing-"]');
const adForm = document.querySelector('.ad-form');
const fieldsets = adForm.querySelectorAll('fieldset');

const switchMapState = (active = true) => {
  mapFilters.reset();
  adForm.reset();
  switchDisabled(fieldsets, !active);
  switchDisabled(mapFilterList, !active);

  if (active) {
    adForm.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('map__filters--disabled');
  } else {
    mapCanvas.innerHTML = '';
    adForm.classList.add('ad-form--disabled');
    mapFilters.classList.add('map__filters--disabled');
  }
};

export { switchMapState };
