import { getData } from './data.js';
import { thumbnails } from './create-thumbnails.js';
import { showPostPreview } from './show-post.js';
import { setPostForm } from './post-form.js';
import {hideImgEditPopup} from './popup-img.js';
import { showMessage } from './util.js';
import './scale-img.js';
import './preview-filters.js';
import './slider.js';

getData(thumbnails, showPostPreview);
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
