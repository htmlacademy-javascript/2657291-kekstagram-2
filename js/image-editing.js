import {closeUploadForm} from './working-form.js';

const scaleContainer = document.querySelector('.img-upload__scale'); //родительский контейнер
const reduceImageElement = scaleContainer.querySelector('.scale__control--smaller'); //кнопка уменьшения изображения
const enlargeImageElement = scaleContainer.querySelector('.scale__control--bigger'); //кнопка увеличения изображения
const inputImageElement = scaleContainer.querySelector('.scale__control--value'); //input
const viewingImageElement = document.querySelector('.img-upload__preview img'); //предварительный просмотр изображения img

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

//Функция уменьшения изображения
reduceImageElement.addEventListener('click', () => {
  let currentValue = inputImageElement.value; //текущее значение input
  let currentNumber = parseInt(currentValue); //приводим это значение к числу

  // Проверяем и уменьшаем
  if (currentNumber > MIN_SCALE) {
    currentNumber = currentNumber - SCALE_STEP;

    // ОБНОВЛЯЕМ сам input (важно!)
    inputImageElement.value = currentNumber + '%';

    // Меняем размер изображения
    viewingImageElement.style.transform = `scale(${currentNumber / 100})`;
  }
});

//Функция увеличения изображения
enlargeImageElement.addEventListener('click', () => {
  let currentValue = inputImageElement.value; //текущее значение input
  let currentNumber = parseInt(currentValue); //приводим это значение к числу

  // Проверяем и уменьшаем
  if (currentNumber < MAX_SCALE) {
    currentNumber += SCALE_STEP;

    // ОБНОВЛЯЕМ сам input (важно!)
    inputImageElement.value = currentNumber + '%';

    // Меняем размер изображения
    viewingImageElement.style.transform = `scale(${currentNumber / 100})`;
  }
});

const resetScale = () => {
  inputImageElement.value = `${DEFAULT_SCALE}%`;
  viewingImageElement.style.transform = `scale(${DEFAULT_SCALE / 100})`;
};

