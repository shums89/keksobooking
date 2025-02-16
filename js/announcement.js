import { getHousing } from './data.js';
import { getDeclension } from './util.js';

const container = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

function getCapacity({ rooms, guests }) {
  let str = `${rooms} ${getDeclension(rooms, ['комната', 'комнаты', 'комнат'])} `;

  str += (guests) ?
    `для ${guests} ${getDeclension(guests, ['гостя', 'гостей', 'гостей'])}` :
    'не для гостей';

  return str;
}

const createCardElement = ({ author, offer }) => {
  const cardElement = cardTemplate.cloneNode(true);
  const features = cardElement.querySelector('.popup__features');
  const featureList = features.querySelectorAll('.popup__feature');
  const photos = cardElement.querySelector('.popup__photos');
  const photo = photos.querySelector('.popup__photo');

  cardElement.querySelector('.popup__avatar').src = author.avatar;
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = getHousing()[offer.type].translate;
  cardElement.querySelector('.popup__text--capacity').textContent = getCapacity(offer);
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  if (offer.features) {
    featureList.forEach((item) => {
      const isNecessary = offer.features.some(
        (feature) => item.classList.contains(`popup__feature--${feature}`)
      );

      if (!isNecessary) {
        item.remove();
      }
    });
  } else {
    features.remove();
  }

  if (offer.description) {
    cardElement.querySelector('.popup__description').textContent = offer.description;
  }
  else {
    cardElement.querySelector('.popup__description').remove();
  }

  if (offer.photos) {
    photos.innerHTML = '';

    offer.photos.forEach((item) => {
      const photoElement = photo.cloneNode(true);

      photoElement.src = item;
      photos.appendChild(photoElement);
    });
  } else {
    photos.remove();
  }

  return cardElement;
};

const renderAnnouncements = (announcement) => {
  const cardListFragment = document.createDocumentFragment();

  cardListFragment.appendChild(createCardElement(announcement));

  container.appendChild(cardListFragment);
};

export { renderAnnouncements, createCardElement };
