import { URL_GET, URL_POST } from './consts.js';

const getData = (onSuccess, onFail) => {
  fetch(URL_GET)
    .then((response) => response.json())
    .then((announcements) => {
      onSuccess(announcements);
    })
    .catch(() => {
      onFail();
    });
};

const sendData = (onSuccess, onFail, onFinally, body) => {
  fetch(
    URL_POST,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    })
    .finally(() => {
      onFinally();
    });
};

export { getData, sendData };
