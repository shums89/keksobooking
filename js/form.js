import { getData, sendData } from './api.js';
import { ANNOUNCEMENT_COUNT, getHousing, getMapInitValues } from './consts.js';
import { address, capacity, fieldsets, form, price, resetBtn, roomNumber, slider, time, title, typeHousing } from './elems.js';
import { createMap, loadMockData, removeMap } from './map.js';
import { formatNumber, getDeclension, showAlert, switchDisabled } from './util.js';

const HOUSING = getHousing();

const getPriceExtremum = (extremum) => HOUSING[typeHousing.value][`price-${extremum}`];

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',                // Элемент, на который будут добавляться классы
  errorClass: 'ad-form__element--invalid',    // Класс, обозначающий невалидное поле
  successClass: 'ad-form__element--valid',    // Класс, обозначающий валидное поле
  errorTextParent: 'ad-form__element',        // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'span',                       // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'form__error'               // Класс для элемента с текстом ошибки
});

//====================================================================

const validateTitle = (value) => value.length >= 30 && value.length <= 100;

pristine.addValidator(
  title,                      // Элемент DOM, к которому применяется валидатор.
  validateTitle,              // Функция, проверяющая поле.
  'От 30 до 100 символов',    // Сообщение, которое будет показано, если проверка не пройдена.
  5,                          // Приоритет функции валидатора. По умолчанию 1.
  true                        // Останавливает проверку текущего поля после этой проверки, и игнорирует остальные валидаторы в текущем поле (если true).
);

//====================================================================

const validatePrice = (value) => value.length && +value >= getPriceExtremum('min') && +value <= getPriceExtremum('max');
const getPriceErrorMessage = () => `Цена от ${formatNumber(getPriceExtremum('min'))} до ${formatNumber(getPriceExtremum('max'))} руб.`;

pristine.addValidator(price, validatePrice, getPriceErrorMessage, 5, true);

const onChangeTypeHousing = () => {
  const newValue = getPriceExtremum('min');

  price.min = newValue;
  price.placeholder = newValue;
  pristine.validate(price);

  slider.noUiSlider.updateOptions({
    range: {
      min: getPriceExtremum('min'),
      max: getPriceExtremum('max'),
    },
    start: price.value ? price.value : newValue,
  });
};

noUiSlider.create(slider, {
  range: {
    min: getPriceExtremum('min'),
    max: getPriceExtremum('max'),
  },
  start: 0,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      // if (Number.isInteger(value)) {
      //   return value.toFixed(0);
      // }
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

slider.noUiSlider.on('update', () => {
  price.value = slider.noUiSlider.get();
  pristine.validate(price);
});

//====================================================================

const validateCapacity = (value) => {
  const rooms = roomNumber.value;

  return value.length && +rooms === 100 ? +value === 0 : +value > 0 && +value <= rooms;
};

const getCapacityErrorMessage = () => {
  const rooms = roomNumber.value;

  if (+rooms !== 100) {
    if (+capacity.value === 0) {
      return 'Выберите количество гостей';
    }
    return `Не больше ${rooms} ${getDeclension(rooms, ['гостя', 'гостей', 'гостей'])}`;
  }
  return 'Не для гостей';

};

pristine.addValidator(capacity, validateCapacity, getCapacityErrorMessage, 5, true);

const onChangeRoomNumber = () => {
  pristine.validate(capacity);
};

//====================================================================

const onChangeTime = (evt) => {
  const fields = time.querySelectorAll('select');

  for (const field of fields) {
    if (field.value !== evt.target.value) {
      field.value = evt.target.value;
    }
  }
};

//====================================================================

const resetForm = () => {
  const MAP_INIT_VALUES = getMapInitValues();

  pristine.reset();
  form.reset();

  address.value = `${MAP_INIT_VALUES.lat.toFixed(5)}, ${MAP_INIT_VALUES.lng.toFixed(5)}`;
  price.min = 0;
  price.placeholder = 0;

  onChangeTypeHousing();
  removeMap();

  getData((announcements) => {
    createMap(announcements.slice(0, ANNOUNCEMENT_COUNT));
  }, loadMockData);
};

const onResetForm = (evt) => {
  evt.preventDefault();

  resetForm();
};

const onSubmitForm = (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    sendData(
      resetForm,
      () => {
        showAlert('Не удалось отправить форму. Попробуйте ещё раз');
      },
      new FormData(evt.target),
    );
  }
};

//====================================================================

const switchFormState = (active = true) => {
  form.reset();
  switchDisabled(fieldsets, !active);

  if (active) {
    form.classList.remove('ad-form--disabled');
    form.addEventListener('submit', onSubmitForm);
    resetBtn.addEventListener('click', onResetForm);
    typeHousing.addEventListener('change', onChangeTypeHousing);
    roomNumber.addEventListener('change', onChangeRoomNumber);
    time.addEventListener('change', onChangeTime);
  } else {
    form.classList.add('ad-form--disabled');
    form.removeEventListener('submit', onSubmitForm);
    resetBtn.removeEventListener('click', onResetForm);
    typeHousing.removeEventListener('change', onChangeTypeHousing);
    roomNumber.removeEventListener('change', onChangeRoomNumber);
    time.removeEventListener('change', onChangeTime);
  }
};

export {
  switchFormState,
};

