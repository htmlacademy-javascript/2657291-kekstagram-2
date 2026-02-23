import { resetValidation } from './validation.js';
import { resetScale, resetEffects } from './image-editing.js';

const valuesUploadInputElement = document.querySelector('.img-upload__input'); //Изначальное состояние поля для загрузки изображения
const uploadOverlayElement = document.querySelector('.img-upload__overlay'); //div Форма редактирования изображения
const buttonUploadCancelElement = document.querySelector('.img-upload__cancel'); //Кнопка для закрытия формы редактирования изображения

/*Функция, которая закрывает*/
const closeUploadForm = () => {
  uploadOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  valuesUploadInputElement.value = ''; // Сбрасываем значение input

  resetScale(); // Сбрасываем масштаб до 100%
  resetEffects(); // Сбросит фильтры в image-editing.js
  resetValidation(); // Сбрасываем ошибки Pristine
  //Запрещаем слушать функцию»
  document.removeEventListener('keydown', onClosingEsc);
};

/*Функция вызывающая закрытие по Esc*/
function onClosingEsc (evt) {
// Проверка: не нажата ли клавиша в поле ввода (чтобы форма не закрылась случайно)
  const isInputFocused = document.activeElement.closest('.text__hashtags') || document.activeElement.closest('.text__description');

  // Если нажат Esc И мы НЕ находимся в поле ввода
  if (evt.key === 'Escape' && !isInputFocused) {
    evt.preventDefault();
    closeUploadForm();
  }
}

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

buttonUploadCancelElement.addEventListener('click', () => {
  closeUploadForm();
});

export { closeUploadForm };
