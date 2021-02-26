import { isEscEvent } from './util.js';

const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAGS = 5;
const VALID_SYMBOLS = /^#[a-z0-9а-я]+$/i; // только буквы и цифры без учета регистра, начиная с #

const isValidSymbols = (item) => {
  return item !== '' && !(item.match(VALID_SYMBOLS));
};

// Проверка на дубликаты в массиве
const isDublicate = (array) => {
  const noDubl = new Set(array);
  return noDubl.size !== array.length;
};

// Действия при вводе данных в поле
const onFieldsInput = (evt) => {
  const field = evt.target;
  const fieldLength = field.value.length;
  const isComment = field.classList.contains('text__description');
  const isHashtags = field.classList.contains('text__hashtags');

  // Валидация комментариев
  if (isComment) {
    if (fieldLength > MAX_COMMENT_LENGTH) {
      field.setCustomValidity(`Максимум ${MAX_COMMENT_LENGTH} символов. Сейчас ${fieldLength}`)
    } else {
      field.setCustomValidity('')
    }
  }

  // Валидация хештегов
  if (isHashtags) {
    const hashtags = field.value.toLowerCase().split(' ');

    hashtags.forEach((item, i, array) => {
      if (array.length > 1 && array[i - 1] === '') {
        field.setCustomValidity('Удалите пробелы')
      } else if (array.length > MAX_HASHTAGS) {
        field.setCustomValidity('Максимум 5 хештегов')
      } else if (item.length > MAX_HASHTAG_LENGTH) {
        field.setCustomValidity(`Хештег должен быть короче 20 символов, удалите ${item.length - 20} симв.`)
      } else if (isDublicate(array)) {
        field.setCustomValidity('Такой хештег уже есть')
      } else if (isValidSymbols(item)) {
        field.setCustomValidity('Хештег должен начинаться с # и содержать только буквы и цифры')
      } else if (array.length === 1 && item === '') {
        field.setCustomValidity('')
      } else {
        field.setCustomValidity('');
      }
    });
  }

  field.reportValidity();
};

// Переопределяем действие по Esc,
// чтобы не закрывалась форма
const onFieldsFocus = (evt) => {
  evt.target.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      evt.stopPropagation();
    }
  });
};

export { onFieldsInput, onFieldsFocus };
