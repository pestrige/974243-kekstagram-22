import { thumbnails } from './create-thumbnails.js';
import { isEscEvent } from './util.js';

const post = document.querySelector('.big-picture');
const postImg = post.querySelector('.big-picture__img img');
const postLikes = post.querySelector('.likes-count');
const postCommentsCount = post.querySelector('.comments-count');
const postCaption = post.querySelector('.social__caption');
const postComments =post.querySelector('.social__comments');
const closeButton = post.querySelector('.cancel');

const socialCommentCount = post.querySelector('.social__comment-count'); //remove in future
const commentsLoader = post.querySelector('.comments-loader'); //remove in future

// Список всех превью картинок
const thumbnailsList = document.querySelectorAll('.picture');

// Создаем комментарий
const createComment = (avatar, message, name) => {
  return `
    <li class="social__comment">
      <img
        class="social__picture"
        src="${avatar}"
        alt="${name}"
        width="35" height="35">
      <p class="social__text">${message}</p>
    </li>
  `;
};

// Заполняем пост сгенерированными данными
const insertPostData = (index) => {
  const {url, likes, description, comments} = thumbnails[index];

  postImg.src = url;
  postLikes.textContent = likes;
  postCommentsCount.textContent = comments.length;
  postCaption.textContent = description;

  postComments.innerHTML = '';

  // Вставляем комментарий
  comments.forEach(({avatar, message, name}) => {
    const comment = createComment(avatar, message, name);
    postComments.insertAdjacentHTML('beforeend', comment);
  });
};

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
  socialCommentCount.classList.add('hidden'); //remove in future
  commentsLoader.classList.add('hidden'); //remove in future

  closeButton.addEventListener('click', closePost);
  document.addEventListener('keydown', onPostEscKeydown);
};

// Скрываем пост
const closePost = (evt) => {
  evt.preventDefault();
  post.classList.add('hidden');
  document.body.classList.remove('modal-open');
  socialCommentCount.classList.remove('hidden'); //remove in future
  commentsLoader.classList.remove('hidden'); //remove in future

  closeButton.removeEventListener('click', closePost);
  document.removeEventListener('keydown', onPostEscKeydown);
};

// Подписываемся на клик по каждой превьюшке картинки,
// где i будет соответствовать индексу превью и индексу в массиве данных
thumbnailsList.forEach((item, i) => {
  item.addEventListener('click', (evt) => {
    insertPostData(i);
    showPost(evt);
  });
});
