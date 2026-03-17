import { getData } from './server.js';

// Импортируем отрисовку миниатюр
import { renderThumbnails } from './rendering-thumbnails.js';

//Импортируем отрисовку большого фото
import { initBigPicture } from './rendering-full-size-image.js';

import './form.js';
import './image-editing.js';

import { initUploadImagePreview } from './upload-image.js';
initUploadImagePreview();

//Функция сброса таймера отрисоки фото
import { showDataError } from './util.js';

import { initFilters } from './filters.js';

//Загрузка данных (фотографий) с сервера
getData()
  .then((photos) => {
    renderThumbnails(photos);
    initBigPicture(photos);

    initFilters(photos);
  })
  .catch(() => {
    // Вызывай здесь свою функцию показа ошибки на 5 секунд (п. 4.2 ТЗ)
    showDataError();
  });
