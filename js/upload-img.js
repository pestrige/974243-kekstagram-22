import { isEscEvent } from './util.js';
import { onScaleBtnClick, restorePreviewImgScale } from './scale-img.js';

const uploadFileInput = document.querySelector('#upload-file');
const imgEditPopup = document.querySelector('.img-upload__overlay');
const closePopup = imgEditPopup.querySelector('#upload-cancel');
const smallerBtn = imgEditPopup.querySelector('.scale__control--smaller');
const biggerBtn = imgEditPopup.querySelector('.scale__control--bigger');

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

  smallerBtn.addEventListener('click', onScaleBtnClick);
  biggerBtn.addEventListener('click', onScaleBtnClick);
};

const hideImgEditPopup = () => {
  uploadFileInput.value = '';
  imgEditPopup.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closePopup.removeEventListener('click', hideImgEditPopup);
  document.removeEventListener('keydown', onImgEditPopupKeydown);

  smallerBtn.removeEventListener('click', onScaleBtnClick);
  biggerBtn.removeEventListener('click', onScaleBtnClick);
  restorePreviewImgScale();
};

uploadFileInput.addEventListener('change', () => {
  showImgEditPopup();
});

showImgEditPopup(); //for test only
