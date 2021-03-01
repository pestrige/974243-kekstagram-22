import { previewImg } from './popap-img.js';

// Показываем превью загруженной пользователем фотографии
const showImg = (evt) => {
  const file = evt.target.files[0];
  const reader = new FileReader();

  reader.onload = ((img) => {
    return (evt) => img.src = evt.target.result;
  })(previewImg);
  reader.readAsDataURL(file);
};

export { showImg };
