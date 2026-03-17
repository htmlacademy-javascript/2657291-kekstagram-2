import { getData } from './server.js';

import { renderThumbnails } from './rendering-thumbnails.js';

import { initBigPicture } from './rendering-full-size-image.js';

import './form.js';
import './image-editing.js';

import { initUploadImagePreview } from './upload-image.js';
initUploadImagePreview();

import { showDataError } from './util.js';

import { initFilters } from './filters.js';

getData()
  .then((photos) => {
    renderThumbnails(photos);
    initBigPicture(photos);

    initFilters(photos);
  })
  .catch(() => {
    showDataError();
  });
