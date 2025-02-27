import { errorTemplate, successTemplate } from './elems.js';
import { isEscapeKey } from './util.js';

const closeSuccess = () => {
  const popup = document.querySelector('body>.success');

  popup.remove();
};

const onSuccessEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccess();
    document.removeEventListener('keydown', onSuccessEscKeydown);
  }
};

const showSuccessMsg = () => {
  const popup = successTemplate.cloneNode(true);

  popup.addEventListener('click', closeSuccess);
  document.addEventListener('keydown', onSuccessEscKeydown);

  document.body.appendChild(popup);
};


const closeError = () => {
  const popup = document.querySelector('body>.error');

  popup.remove();
};

const onErrorEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeError();
    document.removeEventListener('keydown', onErrorEscKeydown);
  }
};

const showErrorMsg = () => {
  const popup = errorTemplate.cloneNode(true);

  popup.addEventListener('click', closeError);
  document.addEventListener('keydown', onErrorEscKeydown);

  document.body.appendChild(popup);
};

export {
  showSuccessMsg,
  showErrorMsg,
};
