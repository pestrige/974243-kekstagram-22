import { getData } from './data.js';
import { renderThumbnails } from './render-thumbnails.js';
import { showPostPreview } from './show-post.js';
import { setPostForm } from './post-form.js';
import { hideImgEditPopup } from './popup-img.js';
import { showMessage, debounce } from './util.js';
import { showFilterContainer, setFilterClick } from './posts-filters.js';
import './scale-img.js';
import './previews-filters.js';
import './slider.js';

const RENDER_DELAY = 500;

getData((data) => {
  renderThumbnails(data);
  showPostPreview(data);
  showFilterContainer();
  setFilterClick(data, debounce(renderThumbnails, RENDER_DELAY));
});

setPostForm(
  () => {
    hideImgEditPopup();
    showMessage('success');
  },
  () => {
    hideImgEditPopup();
    showMessage('error');
  },
);
