const REMOVE_MESSAGE_TIMEOUT = 5000;

const errorTemplateElement = document.querySelector('#data-error').content.querySelector('.data-error');
const body = document.body;

// Функция показа ошибки загрузки
export const showDataError = () => {
  const errorElement = errorTemplateElement.cloneNode(true);
  body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
};

//Функция не дает перерисоввать фотографии слишком быстро, обнуляет таймер перерисовки
export const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};
