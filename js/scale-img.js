import { previewImg, scaleInput } from './upload-img.js';

//const scaleInput = document.querySelector('.scale__control--value');
//const previewImg = document.querySelector('.img-upload__preview img');

//Масштабируем картинку по кликам на кнопки
const onScaleBtnClick = (evt) => {
  evt.preventDefault();
  const scaleBtn = evt.target;
  const isSmallerBtn = scaleBtn.classList.contains('scale__control--smaller');
  const isBiggerBtn = scaleBtn.classList.contains('scale__control--bigger');
  let inputValue = Number(scaleInput.value.slice(0, -1)); // Строка в число без процентов

  if (isSmallerBtn && inputValue > 0) {
    inputValue -= 25;
  }
  if (isBiggerBtn && inputValue < 100) {
    inputValue += 25;
  }

  if (inputValue > 100) {
    inputValue = 100;
  }
  if (inputValue < 25) {
    inputValue = 25;
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
const restorePreviewImgScale = () => previewImg.removeAttribute('style');

export { onScaleBtnClick, restorePreviewImgScale };
