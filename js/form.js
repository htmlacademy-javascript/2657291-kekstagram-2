import { resetValidation, validateForm } from './validation.js';
import { resetEffects } from './image-editing.js';
import { resetScale } from './scale.js';
import { sendData } from './server.js';

const valuesUploadInputElement = document.querySelector('.img-upload__input');
const uploadOverlayElement = document.querySelector('.img-upload__overlay');
const buttonUploadCancelElement = document.querySelector('.img-upload__cancel');
const formSendingElement = document.querySelector('.img-upload__form');
const buttonSendingElement = document.querySelector('.img-upload__submit');
const successTemplateElement = document.querySelector('#success').content.querySelector('.success');
const errorTemplateElement = document.querySelector('#error').content.querySelector('.error');

const SubmitTexts = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const closeUploadForm = () => {
  uploadOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  valuesUploadInputElement.value = '';

  resetScale();
  resetEffects();
  resetValidation();

  document.removeEventListener('keydown', onClosingEsc);
};

function onClosingEsc (evt) {
  const isInputFocused = document.activeElement.closest('.text__hashtags') || document.activeElement.closest('.text__description');

  if (evt.key === 'Escape' && !isInputFocused) {
    evt.preventDefault();
    closeUploadForm();
  }
}

const openUploadForm = () => {
  uploadOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onClosingEsc);
};

valuesUploadInputElement.addEventListener('change', () => {
  openUploadForm();
});

buttonUploadCancelElement.addEventListener('click', () => {
  closeUploadForm();
});

const blockSubmitButton = (isBlocked = true) => {
  buttonSendingElement.disabled = isBlocked;
  buttonSendingElement.textContent = isBlocked ? SubmitTexts.SENDING : SubmitTexts.IDLE;
};

const showMessage = (messageElement) => {
  const clone = messageElement.cloneNode(true);
  document.body.append(clone);

  const closeButton = clone.querySelector('button');

  const closeMessage = () => {
    clone.remove();
    document.removeEventListener('keydown', onMessageEsc, true);
    document.removeEventListener('click', onOutsideClick);
  };

  closeButton.addEventListener('click', closeMessage);

  function onMessageEsc(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      evt.stopPropagation();
      closeMessage();
    }
  }

  document.addEventListener('keydown', onMessageEsc, true);

  function onOutsideClick(evt) {
    if (evt.target === clone) {
      closeMessage();
    }
  }
  document.addEventListener('click', onOutsideClick);
};

formSendingElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (validateForm()) {
    blockSubmitButton();

    const formData = new FormData(evt.target);

    sendData(formData)
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        closeUploadForm();
        showMessage(successTemplateElement);
      })
      .finally(() => {
        blockSubmitButton(false);
      })
      .catch(() => {
        showMessage(errorTemplateElement);
      });
  }
});

export { closeUploadForm };
