import { isEscEvent } from './util.js';
import { renderPost, onCommentsLoaderClick } from './full-post.js';

const post = document.querySelector('.big-picture');
const closeButton = post.querySelector('.cancel');
const commentsLoader = post.querySelector('.comments-loader');

// Список превью картинок
const thumbnailsList = document.querySelector('.pictures');

// Закрыть пост по Esc
const onPostEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closePost(evt);
  }
};

// Показываем пост
const showPost = (evt) => {
  evt.preventDefault();
  post.classList.remove('hidden');
  document.body.classList.add('modal-open');

  if (!commentsLoader.classList.contains('hidden')) {
    commentsLoader.addEventListener('click', onCommentsLoaderClick);
  }

  closeButton.addEventListener('click', closePost);
  document.addEventListener('keydown', onPostEscKeydown);
};

// Скрываем пост
const closePost = (evt) => {
  evt.preventDefault();
  post.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);

  closeButton.removeEventListener('click', closePost);
  document.removeEventListener('keydown', onPostEscKeydown);
};

// Обертка, чтобы получить массив данных с сервера
const showPostPreview = (dataArrayFromServer) => {

  // Подписываемся на клик по каждой превьюшке картинки через делегирование
  thumbnailsList.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('a.picture');

    if (thumbnail) {
      const thumbnailId = thumbnail.dataset.id;
      renderPost(thumbnailId, dataArrayFromServer);
      showPost(evt);
    } else return false;
  });
};

export { showPostPreview };
