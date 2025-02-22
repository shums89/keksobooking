export const getMapInitValues = () => {
  const MAP_INIT_VALUES = {
    lat: 35.677760,
    lng: 139.768971,
    zoom: 12,
  };

  return MAP_INIT_VALUES;
};

export const getHousing = () => {
  const HOUSING = {
    bungalow: {
      'price-min': 0,
      'price-max': 100000,
      'translate': 'Бунгало',
    },
    flat: {
      'price-min': 1000,
      'price-max': 100000,
      'translate': 'Квартира',
    },
    hotel: {
      'price-min': 3000,
      'price-max': 100000,
      'translate': 'Отель',
    },
    house: {
      'price-min': 5000,
      'price-max': 100000,
      'translate': 'Дом',
    },
    palace: {
      'price-min': 10000,
      'price-max': 100000,
      'translate': 'Дворец',
    },
  };

  return HOUSING;
};
