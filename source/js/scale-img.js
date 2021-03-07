import { previewImg, scaleInput } from './popup-img.js';

const MIN_SCALE = 25;
const MAX_SCALE = 100;

//Масштабируем картинку по кликам на кнопки
const onScaleBtnClick = (evt) => {
  evt.preventDefault();
  const scaleBtn = evt.target;
  const isSmallerBtn = scaleBtn.classList.contains('scale__control--smaller');
  const isBiggerBtn = scaleBtn.classList.contains('scale__control--bigger');
  let inputValue = Number(scaleInput.value.slice(0, -1)); // Строка в число без процентов

  if (isSmallerBtn && inputValue > 0) {
    inputValue -= MIN_SCALE;
  }
  if (isBiggerBtn && inputValue < MAX_SCALE) {
    inputValue += MIN_SCALE;
  }

  if (inputValue > MAX_SCALE) {
    inputValue = MAX_SCALE;
  }
  if (inputValue < MIN_SCALE) {
    inputValue = MIN_SCALE;
  }

  changePreviewImgScale(inputValue);
  return scaleInput.value = inputValue + '%';
};

//Записываем значение масштаба в стили
const changePreviewImgScale = (inputValue) => {
  const scaleRatio = inputValue / 100;
  previewImg.style.transform = `scale(${scaleRatio})`;
};

//Сбрасываем стили масштаба
const restorePreviewImgScale = () => {
  previewImg.removeAttribute('style');
  scaleInput.value = '100%';
};

export { onScaleBtnClick, restorePreviewImgScale };
