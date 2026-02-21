import { resetValidation } from '../vendor/pristine/pristine.min.js';

const valuesUploadInputElement = document.querySelector('.img-upload__input'); //Изначальное состояние поля для загрузки изображения
const uploadOverlayElement = document.querySelector('.img-upload__overlay'); //div Форма редактирования изображения
const buttonUploadCancelElement = document.querySelector('.img-upload__cancel'); //Кнопка для закрытия формы редактирования изображения
const previewElement = document.querySelector('.img-upload__preview img'); //img bp предварительный просмотр изображения

/*Функция открытия формы*/
const openUploadForm = () => {
  uploadOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onClosingEsc);
};

//Прослушиватель при изменении на input
valuesUploadInputElement.addEventListener('change', () => {
  openUploadForm();
});

/*Функция, которая закрывает*/
const closeUploadForm = () => {
  uploadOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  valuesUploadInputElement.value = ''; // Сбрасываем значение input

  resetScale(); // Сбрасываем масштаб до 100%
  resetValidation(); // Сбрасываем ошибки Pristine
  //Запрещаем слушать функцию»
  document.removeEventListener('keydown', onClosingEsc);
};

/*Функция вызывающая закрытие по Esc*/
const onClosingEsc = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeUploadForm(); //Функцию закрытия
  }
};

buttonUploadCancelElement.addEventListener('click', () => {
  closeUploadForm();
});

export { closeUploadForm };
