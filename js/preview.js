const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarChooser = document.querySelector('#avatar');
const avatar = document.querySelector('.ad-form-header__upload img');
const avatarSrc = avatar.src;

const imagesChooser = document.querySelector('#images');
const imageContainer = document.querySelector(' .ad-form__photo-container .ad-form__photo');

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    avatar.src = URL.createObjectURL(file);
  }
});

imagesChooser.addEventListener('change', () => {
  const file = imagesChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imageContainer.innerHTML = `
      <img src="${URL.createObjectURL(file)}" alt="Фото жилья" style="width: 100%; height: 100%; object-fit: contain;">
    `;
  }
});

export const deleteImages = () => {
  imageContainer.innerHTML = '';
  avatar.src = avatarSrc;
};
