const MAX_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 140;
const VALID_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;

const newImageElementForm = document.querySelector('.img-upload__form');
const hashtagInputElement = newImageElementForm.querySelector('.text__hashtags');
const commentInputElement = newImageElementForm.querySelector('.text__description');

const pristine = new Pristine(newImageElementForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper__error-text'
});

const validateHashtagSymbols = (value) => {
  if (value.length === 0) {
    return true;
  }

  const hashtags = value.trim().split(' ').filter((item) => item.length > 0);
  return hashtags.every((item) => VALID_HASHTAG.test(item));
};

const validateHashtagLength = (value) => {
  const hashtagsLength = value.split(' ').filter((item) => item.length > 0);

  return hashtagsLength.length <= MAX_HASHTAGS;
};

const validateHashtagUnique = (value) => {
  const hashtags = value.split(' ').filter((item) => item.length > 0);
  const newHashtags = hashtags.map((item) => item.toLowerCase());

  const hashtagsUnique = new Set(newHashtags);

  if (hashtags.length === hashtagsUnique.size) {
    return true;
  }
  return false;
};

const validateComment = (value) => value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(hashtagInputElement, validateHashtagSymbols,
  'Хэштег должен начинаться с # и состоять из букв/цифр (до 20 символов)');
pristine.addValidator(hashtagInputElement, validateHashtagLength,
  `Хэштегов должно быть не более ${MAX_HASHTAGS} !`);
pristine.addValidator(hashtagInputElement, validateHashtagUnique,
  'Хэштеги должны не должны повторяться!');

pristine.addValidator(commentInputElement, validateComment,
  `Длина комментария не может быть больше ${MAX_COMMENT_LENGTH} символов !`);

newImageElementForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

const resetValidation = () => {
  pristine.reset();
};

const validateForm = () => pristine.validate();

export { resetValidation, validateForm };
