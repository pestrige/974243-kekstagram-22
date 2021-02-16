import { thumbnails } from './create-thumbnails.js';

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
  const comment = document.createElement('li');
  const commentText = document.createElement('p');
  const commentAvatar = document.createElement('img');

  comment.classList.add('social__comment');
  commentAvatar.classList.add('social__picture');
  commentText.classList.add('social__text');
  commentAvatar.src = avatar;
  commentAvatar.alt = name;
  commentText.textContent = message;

  comment.appendChild(commentAvatar);
  comment.appendChild(commentText);

  return comment;
};

// Заполняем пост сгенерированными данными
const insertPostData = (index) => {
  const {url, likes, description, comments} = thumbnails[index];
  const commentsFragment = document.createDocumentFragment();

  postImg.src = url;
  postLikes.textContent = likes;
  postCommentsCount.textContent = comments.length;
  postCaption.textContent = description;

  // Вставляем комментарий
  comments.forEach(({avatar, message, name}) => {
    const comment = createComment(avatar, message, name);
    commentsFragment.appendChild(comment);
  });

  postComments.innerHTML = '';
  postComments.appendChild(commentsFragment);
};

// Показываем пост
const showPost = (evt) => {
  evt.preventDefault();
  post.classList.remove('hidden');
  document.body.classList.add('modal-open');
  socialCommentCount.classList.add('hidden'); //remove in future
  commentsLoader.classList.add('hidden'); //remove in future
};

// Скрываем пост
const closePost = (evt) => {
  evt.preventDefault();
  post.classList.add('hidden');
  document.body.classList.remove('modal-open');
  socialCommentCount.classList.remove('hidden'); //remove in future
  commentsLoader.classList.remove('hidden'); //remove in future
};

// Подписываемся на клик по каждой превьюшке картинки,
// где i будет соответствовать индексу превью и индексу в массиве данных
thumbnailsList.forEach((item, i) => {
  item.addEventListener('click', (evt) => {
    insertPostData(i);
    showPost(evt);

    closeButton.addEventListener('click', (evt) => closePost(evt));
  });
});
