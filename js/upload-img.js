import { isEscEvent } from './util.js';

const uploadFileInput = document.querySelector('#upload-file');
const imgEditPopup = document.querySelector('.img-upload__overlay');
const closePopup = imgEditPopup.querySelector('#upload-cancel');

const onImgEditPopupKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    hideImgEditPopup(evt);
  }
};
const showImgEditPopup = () => {
  imgEditPopup.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closePopup.addEventListener('click', hideImgEditPopup);
  document.addEventListener('keydown', onImgEditPopupKeydown);
};

const hideImgEditPopup = () => {
  uploadFileInput.value = '';
  imgEditPopup.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closePopup.removeEventListener('click', hideImgEditPopup);
  document.removeEventListener('keydown', onImgEditPopupKeydown);
};

uploadFileInput.addEventListener('change', () => {
  showImgEditPopup();
});
