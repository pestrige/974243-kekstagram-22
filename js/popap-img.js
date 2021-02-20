import { isEscEvent } from './util.js';
import { onScaleBtnClick, restorePreviewImgScale } from './scale-img.js';
import { onFilterClick } from './preview-filters.js';

// Элементы загрузки и попапа
const uploadFileInput = document.querySelector('#upload-file');
const imgEditPopup = document.querySelector('.img-upload__overlay');
const closePopup = imgEditPopup.querySelector('#upload-cancel');
// Элементы для масштабирования
const smallerBtn = imgEditPopup.querySelector('.scale__control--smaller');
const biggerBtn = imgEditPopup.querySelector('.scale__control--bigger');
const scaleInput = imgEditPopup.querySelector('.scale__control--value');
//Элементы для фильтров
const previewImg = imgEditPopup.querySelector('.img-upload__preview img');
const previewFilters = imgEditPopup.querySelector('.effects__list');
const effectValueInput = imgEditPopup.querySelector('.effect-level__value');

const onImgEditPopupKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    hideImgEditPopup(evt);
  }
};

// Действия по открытию попапа
const showImgEditPopup = () => {
  imgEditPopup.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closePopup.addEventListener('click', hideImgEditPopup);
  document.addEventListener('keydown', onImgEditPopupKeydown);

  smallerBtn.addEventListener('click', onScaleBtnClick);
  biggerBtn.addEventListener('click', onScaleBtnClick);

  previewFilters.addEventListener('click', onFilterClick);
};

// Действия по закрытию попапа
const hideImgEditPopup = () => {
  uploadFileInput.value = '';
  imgEditPopup.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closePopup.removeEventListener('click', hideImgEditPopup);
  document.removeEventListener('keydown', onImgEditPopupKeydown);

  smallerBtn.removeEventListener('click', onScaleBtnClick);
  biggerBtn.removeEventListener('click', onScaleBtnClick);
  restorePreviewImgScale();

  previewFilters.removeEventListener('click', onFilterClick);
};

// Событие для открытия попапа
uploadFileInput.addEventListener('change', () => {
  showImgEditPopup();
});

//showImgEditPopup(); //for test only

export { previewImg, scaleInput, effectValueInput };
