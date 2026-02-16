import { generatedObjects } from './creating-objects-photo-description.js';

const bigPictureElement = document.querySelector('.big-picture'); //section родитель Полноэкранный показ изображения
const bigPictureImgElement = document.querySelector('.big-picture__img img'); //img изображение
const likesCountElement = bigPictureElement.querySelector('.likes-count'); //span с кол-ом лайков
const commentsTotalCountElement = bigPictureElement.querySelector('.social__comment-total-count'); //span общее кол-во коментариев
const commentsShownCountElement = bigPictureElement.querySelector('.social__comment-shown-count'); //span первое кол-во комент. 5 из ...
const socialCommentsElement = bigPictureElement.querySelector('.social__comments'); //контейнер ul > li > фото и коментарий.

const socialCaptionElement = bigPictureElement.querySelector('.social__caption'); //подпись к изображению
const commentCountBlockElement = bigPictureElement.querySelector('.social__comment-count'); //div родитель с инф-ей 5 из 10 коментариев
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader'); //button Загрузить еще
const closeButtonElement = bigPictureElement.querySelector('.big-picture__cancel'); //Крестик - Закрыть
const picturesContainerElement = document.querySelector('.pictures'); //Контейнер с миниатюрами (Контейнер для изображений от других пользователей)

const photos = generatedObjects();
console.log(photos);

const createCommentElement = (commentObject) => {
  const itemCommentList = document.createElement('li');
  itemCommentList.classList.add('social__comment');

  const imgItemComment = document.createElement('img');
  imgItemComment.classList.add('social__picture');

  imgItemComment.src = commentObject.avatar;
  imgItemComment.alt = commentObject.name;
  imgItemComment.width = 35;
  imgItemComment.height = 35;

  const paragraphTextComment = document.createElement('p');
  paragraphTextComment.classList.add('social__text');
  paragraphTextComment.textContent = commentObject.message;

  itemCommentList.appendChild(imgItemComment);
  itemCommentList.appendChild(paragraphTextComment);

  return itemCommentList;
};

const renderComments = (comments) => {
  socialCommentsElement.innerHTML = '';
  const fragment = document.createDocumentFragment();
  comments.forEach((item) => {
    const commentElement = createCommentElement(item);
    fragment.append(commentElement);
  });
  socialCommentsElement.append(fragment);
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
};

const openBigPicture = (photoObject) => {
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureImgElement.src = photoObject.url;
  likesCountElement.textContent = photoObject.likes;
  socialCaptionElement.textContent = photoObject.description;
  commentsTotalCountElement.textContent = photoObject.comments.length;
  commentsShownCountElement.textContent = photoObject.comments.length;

  renderComments(photoObject.comments);
  commentCountBlockElement.classList.add('hidden');
  commentsLoaderElement.classList.add('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
};

const onPicturesContainerClick = (evt) => {
  const thumbnailElement = evt.target.closest('.picture');
  if (!thumbnailElement) {
    return;
  }

  evt.preventDefault();

  const pictureId = Number(thumbnailElement.dataset.pictureId);

  const currentPhoto = photos.find((item) => item.id === pictureId);
  if (currentPhoto) {
    openBigPicture(currentPhoto);
  }
};

picturesContainerElement.addEventListener('click', onPicturesContainerClick);

const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
};

closeButtonElement.addEventListener('click', closeBigPicture);
