import { stringToHtml } from './util.js';

const MAX_SHOWN_COMMENTS = 5;

const post = document.querySelector('.big-picture');
const postImg = post.querySelector('.big-picture__img img');
const postLikes = post.querySelector('.likes-count');
const postCaption = post.querySelector('.social__caption');
const postComments = post.querySelector('.social__comments');
const socialCommentCount = post.querySelector('.social__comment-count');
const postCommentsCount = post.querySelector('.comments-count');
const postShownCommentsCount = post.querySelector('.shown-comments-count');
const commentsLoader = post.querySelector('.comments-loader');

let commentsArrayLength = null;
let tempComments = null;

// Создаем комментарий
const createComment = (avatar, message, name) => {
  const commentStructure = `
    <li class="social__comment">
      <img
        class="social__picture"
        src="${avatar}"
        alt="${name}"
        width="35" height="35">
      <p class="social__text">${message}</p>
    </li>`;
  const comment = stringToHtml(commentStructure);
  return comment;
};

// Действия по клику Загрузить еще
const onCommentsLoaderClick = () => {
  showMoreComments(tempComments, MAX_SHOWN_COMMENTS);
};

// Показываем больше комментариев
const showMoreComments = (tempCommentsArray, count) => {
  const commentsTempContainer = document.createDocumentFragment();

  // Проверяем, чтобы итераций было не больше длины массива
  if (count > tempCommentsArray.length) {
    count = tempCommentsArray.length;
  }
  // Рендерим count комментариев
  for (let i = 0; i < count; i++) {
    const {avatar, message, name} = tempCommentsArray.shift(); // shift возвращает значение удаленного элемента
    const comment = createComment(avatar, message, name);
    commentsTempContainer.appendChild(comment);
  }
  postComments.appendChild(commentsTempContainer);

  // Обновляем счетчик показанных комментариев
  postShownCommentsCount.textContent = commentsArrayLength - tempCommentsArray.length;

  // Скрываем кнопку загрузки комментариев
  if (tempCommentsArray.length === 0) {
    commentsLoader.classList.add('hidden');
    commentsLoader.removeEventListener('click', onCommentsLoaderClick);
  }
};

// Заполняем пост полученными с сервера данными
const renderPost = (id, thumbnails) => {
  const {url, likes, description, comments} = thumbnails[id];
  const commentsCount = comments.length - 1;
  const isLessComments = commentsCount < MAX_SHOWN_COMMENTS;
  commentsArrayLength = comments.length;
  tempComments = comments.slice();

  // Присваиваем значения из массива элементам поста
  postImg.src = url;
  postLikes.textContent = likes;
  postCommentsCount.textContent = commentsArrayLength;
  postCaption.textContent = description;

  postComments.innerHTML = '';

  // Условия рендера комментариев
  if (isLessComments) {
    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    // рендерим все комментарии
    showMoreComments(tempComments, commentsCount);
  } else {
    socialCommentCount.classList.remove('hidden');
    commentsLoader.classList.remove('hidden');
    // рендерим первые N комментариев
    showMoreComments(tempComments, MAX_SHOWN_COMMENTS);
    // и вешаем рендер комментариев на клик
    commentsLoader.addEventListener('click', onCommentsLoaderClick);
  }
};

export { renderPost, onCommentsLoaderClick };
