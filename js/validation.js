const NewImageElementForm = document.querySelector('.img-upload__form');
const hashtagInputElement = NewImageElementForm.querySelector('.text__hashtags');
const commentInputElement = NewImageElementForm.querySelector('.text__description');

const pristine = new Pristine(NewImageElementForm, {
  classTo: 'img-upload__field-wrapper', // Элемент, на который будут добавляться классы
  errorClass: 'img-upload__field-wrapper--error', // Класс, обозначающий невалидное поле
  successClass: 'img-upload__field-wrapper--valid', // Класс, обозначающий валидное поле
  errorTextParent: 'img-upload__field-wrapper', // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'div', // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'img-upload__field-wrapper__error-text' // Класс для элемента с текстом ошибки
});

const VALID_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;

//Функция разбивает строку на массив и проверяет КАЖДЫЙ хэштег
const validateHashtagSymbols = (value) => {
  if (value.length === 0) {
    return true;
  } // Если поле пустое — это валидно (хэштеги необязательны)

  const hashtags = value.trim().split(' ').filter((item) => item.length > 0); // Убираем пробелы в начеле и конце, Обрезаем по одному пробелу, а потом выкидываем из списка всё пустое
  return hashtags.every((item) => VALID_HASHTAG.test(item)); // Проверяем, что ВСЕ хештеги проходят под регулярное выражение VALID_HASHTAG
};

/* Функция проверяет количество хештегов не более 5 */
const validateHashtagLength = (value) => {
  const hashtagsLength = value.split(' ').filter((item) => item.length > 0);

  return hashtagsLength.length <= 5;
};

/* Функция проверяет на уникальность хештегов  */
const validateHashtagUnique = (value) => {
  const hashtags = value.split(' ').filter((item) => item.length > 0);
  const newHashtags = hashtags.map((item) => item.toLowerCase());

  const hashtagsUnique = new Set(newHashtags);

  if (hashtags.length === hashtagsUnique.size) {
    return true;
  }
  return false;
};

/* Функция проверяет длинну комментария < 140 */
const validateComment = (value) => {
  if (value.length <= 140) {
    return true;
  }
  return false;
};

/*                       что проверяем         как проверяем            что написать  */
pristine.addValidator(hashtagInputElement, validateHashtagSymbols, 'Хэштег должен начинаться с # и состоять из букв/цифр (до 20 символов)');
pristine.addValidator(hashtagInputElement, validateHashtagLength, 'Хэштегов должно быть не более 5 !');
pristine.addValidator(hashtagInputElement, validateHashtagUnique, 'Хэштеги должны не должны повторяться!');

pristine.addValidator(commentInputElement, validateComment, 'Длина комментария не может быть больше 140 символов !');

NewImageElementForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

const resetValidation = () => {
  pristine.reset();
};

const validateForm = () => pristine.validate();

export { resetValidation, validateForm };
