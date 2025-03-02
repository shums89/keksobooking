import { ANNOUNCEMENT_COUNT, getHousing } from './consts.js';
import { getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement } from './util.js';

/*
author, объект — описывает автора. Содержит одно поле:
  avatar, строка — адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} — это число от 1 до 10. Перед однозначными числами ставится 0. Например, 01, 02...10. Адреса изображений не повторяются.

offer, объект — содержит информацию об объявлении. Состоит из полей:
  title, строка — заголовок предложения. Придумайте самостоятельно.
  address, строка — адрес предложения. Для простоты пусть пока составляется из географических координат по маске {{location.lat}}, {{location.lng}}.
  price, число — стоимость. Случайное целое положительное число.
  type, строка — одно из пяти фиксированных значений: palace, flat, house, bungalow или hotel.
  rooms, число — количество комнат. Случайное целое положительное число.
  guests, число — количество гостей, которое можно разместить. Случайное целое положительное число.
  checkin, строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.
  checkout, строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.
  features, массив строк — массив случайной длины из значений: wifi, dishwasher, parking, washer, elevator, conditioner. Значения не должны повторяться.
  description, строка — описание помещения. Придумайте самостоятельно.
  photos, массив строк — массив случайной длины из значений:
    https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg,
    https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg,
    https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg.

location, объект — местоположение в виде географических координат. Состоит из двух полей:
  lat, число с плавающей точкой — широта, случайное значение от 35.65000 до 35.70000.
  lng, число с плавающей точкой — долгота, случайное значение от 139.70000 до 139.80000.
*/

const TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'img/photos/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'img/photos/claire-rendall-b6kAwr1i0Iw.jpg',
  'img/photos/duonguyen-8LrGtIxxa4w.jpg'
];

const HOUSING = getHousing();

const createAnnouncement = (_, i) => {
  let announcement = {};
  const type = getRandomArrayElement(Object.keys(HOUSING));
  const location = {
    lat: getRandomPositiveFloat(35.65000, 35.70000, 5),
    lng: getRandomPositiveFloat(139.70000, 139.80000, 5),
  };
  const roomsCount = getRandomArrayElement([1, 2, 3, 100]);

  announcement = {
    author: {
      avatar: `img/avatars/user${(i + 1).toString().padStart(2, '0')}.png`,
    },
    offer: {
      title: `Заголовок жилья №${i + 1}`,
      address: `${location.lat}, ${location.lng}`,
      price: getRandomPositiveInteger(HOUSING[type]['price-min'], HOUSING[type]['price-max']),
      type,
      rooms: roomsCount,
      guests: roomsCount === 100 ? 0 : getRandomPositiveInteger(1, roomsCount),
      checkin: getRandomArrayElement(TIMES),
      checkout: getRandomArrayElement(TIMES),
      features: FEATURES.sort(() => Math.random() - 0.5).slice(0, getRandomPositiveInteger(1, FEATURES.length)),
      description: `Описание жилья №${i + 1}`,
      photos: PHOTOS.sort(() => Math.random() - 0.5).slice(0, getRandomPositiveInteger(1, PHOTOS.length)),
    },
    location,
  };

  return announcement;
};

export const createAnnouncements = () => Array.from({ length: ANNOUNCEMENT_COUNT * 2 }, createAnnouncement);
