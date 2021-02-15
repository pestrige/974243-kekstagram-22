import { photosDescr } from './photos-descr.js';

const templatePicture = document.querySelector('#picture').content.querySelector('.picture');
const pictiresContainer = document.querySelector('.pictures');

const thumbnails = photosDescr;
const thumbnailsContainer = document.createDocumentFragment();

thumbnails.forEach(({url, comments, likes}) => {
  const thumbnail = templatePicture.cloneNode(true);
  const thumbnailPhoto = thumbnail.querySelector('.picture__img');
  const thumbnailComments = thumbnail.querySelector('.picture__comments');
  const thumbnailLikes = thumbnail.querySelector('.picture__likes');

  thumbnail.href = url;
  thumbnailPhoto.src = url;
  thumbnailComments.textContent = comments.length;
  thumbnailLikes.textContent = likes;
  thumbnailsContainer.appendChild(thumbnail);
});

pictiresContainer.appendChild(thumbnailsContainer);

