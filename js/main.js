// Импортируем генератор данных
import { generatedObjects } from './creating-objects-photo-description.js';

// Импортируем отрисовку миниатюр
import { renderThumbnails } from './rendering-thumbnails.js';

//Импортируем отрисовку большого фото
import { initBigPicture } from './rendering-full-size-image.js';

// Подключаем модули формы и редактирования, чтобы сработали их обработчики
import './working-form.js';
import './image-editing.js';

// Генерируем данные один раз!
const photosData = generatedObjects();

// Отрисовываем миниатюры на странице
renderThumbnails(photosData);

//Передаем те же данные в логику полноэкранного режима
initBigPicture(photosData);

