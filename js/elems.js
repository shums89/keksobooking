export const map = document.querySelector('.map');
export const mapCanvas = map.querySelector('#map-canvas');
export const mapFilters = map.querySelector('.map__filters');
export const mapFilterList = mapFilters.querySelectorAll('[id^="housing-"]');

export const form = document.querySelector('.ad-form');
export const fieldsets = form.querySelectorAll('fieldset');
export const title = form.querySelector('#title');
export const typeHousing = form.querySelector('#type');
export const price = form.querySelector('#price');
export const slider = form.querySelector('.ad-form__slider');
export const address = form.querySelector('#address');
export const roomNumber = form.querySelector('#room_number');
export const capacity = form.querySelector('#capacity');
export const time = form.querySelector('.ad-form__element--time');
export const resetBtn = form.querySelector('.ad-form__reset');

export const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
export const successTemplate = document.querySelector('#success').content.querySelector('.success');
export const errorTemplate = document.querySelector('#error').content.querySelector('.error');
