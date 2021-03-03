import { getData } from './data.js';
import { renderThumbnails } from './render-thumbnails.js';
import { showPostPreview } from './show-post.js';
import { setPostForm } from './post-form.js';
import {hideImgEditPopup} from './popup-img.js';
import { showMessage } from './util.js';
import { showFilterContainer, setFilterClick } from './posts-filters.js';
import './scale-img.js';
import './preview-filters.js';
import './slider.js';

getData((data) => {
  renderThumbnails(data);
  showPostPreview(data);
  showFilterContainer();
  setFilterClick(data, renderThumbnails);
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
