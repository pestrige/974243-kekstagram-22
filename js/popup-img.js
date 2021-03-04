import { isEscEvent, debounce } from './util.js';
import { showImg } from './show-img.js';
import { onScaleBtnClick, restorePreviewImgScale } from './scale-img.js';
import { onFilterClick, restoreFilters } from './preview-filters.js';
import { updateSlider } from './slider.js';
import { onFieldsInput, onFieldsFocus } from './post-form.js';

const CHECK_DELAY = 500;

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
//Элементы комментария и хештегов
const fieldSet = imgEditPopup.querySelector('.img-upload__text');
const hashtagsField = fieldSet.querySelector('.text__hashtags');
const commentsField = fieldSet.querySelector('.text__description');

const onImgEditPopupKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    hideImgEditPopup(evt);
  }
};

// Задержка на проверку набранных символов
const onFieldsInputDebounced = debounce(onFieldsInput, CHECK_DELAY);

//Сброс значений до дефолтных
const restoreDefaults = () => {
  uploadFileInput.value = '';
  hashtagsField.value = '';
  commentsField.value = '';

  restorePreviewImgScale();
  updateSlider();
  restoreFilters();
};

// Действия по открытию попапа
const showImgEditPopup = (evt) => {
  imgEditPopup.classList.remove('hidden');
  document.body.classList.add('modal-open');
  showImg(evt);
  closePopup.addEventListener('click', hideImgEditPopup);
  document.addEventListener('keydown', onImgEditPopupKeydown);

  smallerBtn.addEventListener('click', onScaleBtnClick);
  biggerBtn.addEventListener('click', onScaleBtnClick);

  previewFilters.addEventListener('click', onFilterClick);

  fieldSet.addEventListener('input', onFieldsInputDebounced);
  fieldSet.addEventListener('focusin', onFieldsFocus);
};

// Действия по закрытию попапа
const hideImgEditPopup = () => {
  restoreDefaults();
  imgEditPopup.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closePopup.removeEventListener('click', hideImgEditPopup);
  document.removeEventListener('keydown', onImgEditPopupKeydown);

  smallerBtn.removeEventListener('click', onScaleBtnClick);
  biggerBtn.removeEventListener('click', onScaleBtnClick);

  previewFilters.removeEventListener('click', onFilterClick);

  fieldSet.removeEventListener('input', onFieldsInputDebounced);
  fieldSet.removeEventListener('focusin', onFieldsFocus);
};

// Событие для открытия попапа
uploadFileInput.addEventListener('change', (evt) => {
  showImgEditPopup(evt);
});

//showImgEditPopup(); //for test only

export { previewImg, scaleInput, effectValueInput, hideImgEditPopup };
