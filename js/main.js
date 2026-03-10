import { getData } from './module-working-server.js';

// Импортируем отрисовку миниатюр
import { renderThumbnails } from './rendering-thumbnails.js';

//Импортируем отрисовку большого фото
import { initBigPicture } from './rendering-full-size-image.js';

// Подключаем модули формы и редактирования, чтобы сработали их обработчики
import './working-form.js';
import './image-editing.js';

//Функция сброса таймера отрисоки фото
import { debounce } from './util.js';

import { getFilteredPhotos, initFilterListeners } from './filters.js';

const REMOVE_MESSAGE_TIMEOUT = 5000;

// Функция показа ошибки загрузки
const showDataError = () => {
  const errorTemplateElement = document.querySelector('#data-error').content.querySelector('.data-error');
  const errorElement = errorTemplateElement.cloneNode(true);
  document.body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
};

//Загрузка данных (фотографий) с сервера
getData()
  .then((photos) => {
    renderThumbnails(photos);
    initBigPicture(photos);

    //  включение фильтров
    const filterElement = document.querySelector('.img-filters');
    filterElement.classList.remove('img-filters--inactive');

    // оборачиваем debounce в умную функцию, filterId получаем из нижней функции
    const debouncedRenderThumbnails = debounce((filterId) => {
      // Сначала удаляем все старые миниатюры (чтобы не дублировались)
      document.querySelectorAll('.picture').forEach((pic) => pic.remove());

      // Получаем отфильтрованный массив и рисуем его
      const filteredPhotos = getFilteredPhotos(photos, filterId);
      renderThumbnails(filteredPhotos);
    }, 500);

    // ЗАПУСКАЕМ СЛУШАТЕЛЬ КЛИКОВ (из модуля filters.js)
    initFilterListeners(debouncedRenderThumbnails); //filterId получаем тут
  })
  .catch(() => {
    // Вызывай здесь свою функцию показа ошибки на 5 секунд (п. 4.2 ТЗ)
    showDataError();
  });
