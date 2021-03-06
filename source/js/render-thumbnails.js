const templatePicture = document.querySelector('#picture').content.querySelector('.picture');
const pictiresContainer = document.querySelector('.pictures');
const thumbnailsContainer = document.createDocumentFragment();

// Удаляем все превью постов
const clearThumbnailsList = () => {
  const thumbnailsList = pictiresContainer.querySelectorAll('.picture');
  thumbnailsList.forEach(item => item.remove());
}

// Обертка для получения данных с сервера
const renderThumbnails = (data) => {

  // На основе полученного массива data создаем превьюшки постов
  data.forEach(({id, url, comments, likes}) => {
    const thumbnail = templatePicture.cloneNode(true);
    const thumbnailPhoto = thumbnail.querySelector('.picture__img');
    const thumbnailComments = thumbnail.querySelector('.picture__comments');
    const thumbnailLikes = thumbnail.querySelector('.picture__likes');

    thumbnail.dataset.id = id;
    thumbnailPhoto.src = url;
    thumbnailComments.textContent = comments.length;
    thumbnailLikes.textContent = likes;
    thumbnailsContainer.appendChild(thumbnail);
  });

  clearThumbnailsList();
  pictiresContainer.appendChild(thumbnailsContainer);
};

export { renderThumbnails };
