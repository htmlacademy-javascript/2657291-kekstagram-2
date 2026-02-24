import { resetValidation, validateForm } from './validation.js';
import { resetScale, resetEffects } from './image-editing.js';

const valuesUploadInputElement = document.querySelector('.img-upload__input'); //Изначальное состояние поля для загрузки изображения
const uploadOverlayElement = document.querySelector('.img-upload__overlay'); //div Форма редактирования изображения
const buttonUploadCancelElement = document.querySelector('.img-upload__cancel'); //Кнопка для закрытия формы редактирования изображения
const formSendingElement = document.querySelector('.img-upload__form'); //Форма для отправки данных на сервер
const buttonSendingElement = document.querySelector('.img-upload__submit'); //Кнопка для отправки данных на сервер
const successTemplateElement = document.querySelector('#success').content.querySelector('.success'); //шаблон Сообщение об успешной загрузке изображения
const errorTemplateElement = document.querySelector('#error').content.querySelector('.error'); //шаблон Сообщение с ошибкой загрузки изображений от других пользователей

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

const blockSubmitButton = () => {
  buttonSendingElement.disabled = true;
  buttonSendingElement.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  buttonSendingElement.disabled = false;
  buttonSendingElement.textContent = 'Опубликовать';
};

formSendingElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (validateForm()) {
    blockSubmitButton();
    const formData = new FormData(evt.target);

    fetch('https://31.javascript.htmlacademy.pro/kekstagram', {
      method: 'POST',
      body: formData, // Передаем данные (экземпляр new FormData)
    })
      .then((response) => { // Выполнится, когда придет ответ от сервера
        if (response.ok) {
          closeUploadForm();
          showMessage(successTemplateElement);
          // Здесь будем закрывать форму и показывать окно "Success"
        } else {                 // Если сервер ответил ошибкой
          showMessage(errorTemplateElement);
          // Здесь будем показывать окно "Error"
        }
      })
      .catch(() => {
        // Ошибка сети (интернет пропал)
        showMessage(errorTemplateElement);
      })
      .finally(() => {           // Выполнится В ЛЮБОМ СЛУЧАЕ (и при успехе, и при ошибке)
        unblockSubmitButton();   // Разблокируем кнопку обратно
      });
  }
});

const showMessage = (messageElement) => {
  const clone = messageElement.cloneNode(true);
  document.body.append(clone);

  // Ищем кнопку закрытия внутри КЛОНА .success__button)
  const closeButton = clone.querySelector('button');

  // Функция для удаления окна
  const closeMessage = () => {
    clone.remove();
    // Добавляем true для удаления слушателя в фазе погружения
    document.removeEventListener('keydown', onMessageEsc, true);
    document.removeEventListener('click', onOutsideClick);
  };

  // Закрытие по кнопке
  closeButton.addEventListener('click', closeMessage);

  // Закрытие по Esc (отдельный обработчик для сообщения)
  function onMessageEsc(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      evt.stopPropagation();
      closeMessage();
    }
  }
  document.addEventListener('keydown', onMessageEsc, true);

  // Закрытие по клику на произвольную область (вне самого окна)
  function onOutsideClick(evt) {
    if (evt.target === clone) {
      closeMessage();
    }
  }
  document.addEventListener('click', onOutsideClick);
};

export { closeUploadForm };
