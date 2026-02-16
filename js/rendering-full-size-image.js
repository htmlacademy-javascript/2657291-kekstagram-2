import { generatedObjects } from './creating-objects-photo-description.js';

const bigPicture = document.querySelector('.big-picture'); //section родитель Полноэкранный показ изображения
const bigPictureImg = document.querySelector('.big-picture__img img'); //img изображение
const likesCount = bigPicture.querySelector('.likes-count'); //span с кол-ом лайков
const commentsTotalCount = bigPicture.querySelector('.social__comment-total-count'); //span общее кол-во коментариев
const commentsShownCount = bigPicture.querySelector('.social__comment-shown-count'); //span первое кол-во комент. 5 из ...
const socialComments = bigPicture.querySelector('.social__comments'); //контейнер ul > li > фото и коментарий.
const socialCaption = bigPicture.querySelector('.social__caption'); //подпись к изображению
const commentCountBlock = bigPicture.querySelector('.social__comment-count'); //div родитель с инф-ей 5 из 10 коментариев
const commentsLoader = bigPicture.querySelector('.comments-loader'); //button Загрузить еще
const closeButton = bigPicture.querySelector('.big-picture__cancel'); //Крестик - Закрыть
const picturesContainer = document.querySelector('.pictures'); //Контейнер с миниатюрами (Контейнер для изображений от других пользователей)

const photos = generatedObjects();

const createCommentElement = ({avatar, name, message}) => {
  const comment = document.createElement('li');
  comment.classList.add('social__comment'); //Это li c аватаркой коментатора и его коментарием

  const avatarImg = document.createElement('img');
  avatarImg.classList.add('social__picture'); //Это img - сама аватарка
  avatarImg.src = avatar;
  avatarImg.alt = name;
  avatarImg.width = 35;
  avatarImg.height = 35;

  const text = document.createElement('p');
  text.classList.add('social__text'); //Это сам коментарий
  text.textContent = message;

  comment.appendChild(avatarImg);
  comment.appendChild(text);

  return comment; //это созданный li с аватаркой и кометарием
};

//  Функция отрисовки ВСЕХ комментариев
const renderComments = (comments) => {
  socialComments.innerHTML = ''; // Очищаем старые комментарии

  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    fragment.appendChild(commentElement);
  });

  socialComments.appendChild(fragment);

  // Показываем количество комментариев
  commentsShownCount.textContent = comments.length;
};

/*BPEXBN  ИЗУЧИТЬ    */

// Функция открытия
const openBigPicture = (photoData) => {
  bigPictureImg.src = photoData.url;
  bigPictureImg.alt = photoData.description;
  likesCount.textContent = photoData.likes;
  commentsTotalCount.textContent = photoData.comments.length;
  socialCaption.textContent = photoData.description;

  // Отрисовываем комментарии
  renderComments(photoData.comments);

  // Показываем окно (убираем hidden)
  bigPicture.classList.remove('hidden');

  // Блокируем прокрутку страницы
  document.body.classList.add('modal-open');

  // Прячем счетчик и кнопку загрузки (по заданию)
  commentCountBlock.classList.add('hidden');
  commentsLoader.classList.add('hidden');
};

// Функция закрытия
const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  // Можно очистить комментарии при закрытии
  socialComments.innerHTML = '';
};

// Слушаем клики на контейнере с миниатюрами
picturesContainer.addEventListener('click', (evt) => {
  const thumbnail = evt.target.closest('.picture');

  if (thumbnail) {
    evt.preventDefault(); // Не переходить по ссылке

    // Берем ID из data-атрибута картинки из модуля rendering-thumbnails.js
    const pictureId = Number(thumbnail.querySelector('.picture__img').dataset.pictureId);

    // Ищем фото в массиве
    const currentPhoto = photos.find((photo) => photo.id === pictureId);

    if (currentPhoto) {
      openBigPicture(currentPhoto);
    }
  }
});

// Закрытие по крестику
closeButton.addEventListener('click', closeBigPicture);

// Закрытие по Escape
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' && !bigPicture.classList.contains('hidden')) {
    closeBigPicture();
  }
});

