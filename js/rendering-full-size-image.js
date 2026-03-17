const COMMENTS_STEP = 5;

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImgElement = document.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const commentsTotalCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const commentsShownCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
const socialCommentsElement = bigPictureElement.querySelector('.social__comments');

const socialCaptionElement = bigPictureElement.querySelector('.social__caption');
const commentCountBlockElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const closeButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const picturesContainerElement = document.querySelector('.pictures');

let shownCommentsCount = 0;
let currentComments = [];

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

const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
}

const renderNextComments = () => {
  const result = currentComments.slice(shownCommentsCount, shownCommentsCount + COMMENTS_STEP);
  const fragment = document.createDocumentFragment();

  result.forEach((item) => {
    const commentElement = createCommentElement(item);
    fragment.append(commentElement);
  });

  socialCommentsElement.append(fragment);

  shownCommentsCount += result.length;
  commentsShownCountElement.textContent = shownCommentsCount;

  if (shownCommentsCount >= currentComments.length) {
    commentsLoaderElement.classList.add('hidden');
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }
};

const openBigPicture = (photoObject) => {
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureImgElement.src = photoObject.url;
  likesCountElement.textContent = photoObject.likes;
  socialCaptionElement.textContent = photoObject.description;
  commentsTotalCountElement.textContent = photoObject.comments.length;

  socialCommentsElement.innerHTML = '';
  currentComments = photoObject.comments;
  shownCommentsCount = 0;

  commentCountBlockElement.classList.remove('hidden');
  commentsLoaderElement.classList.remove('hidden');

  renderNextComments();

  document.addEventListener('keydown', onDocumentKeydown);
};

const initBigPicture = (data) => {
  picturesContainerElement.addEventListener('click', (evt) => {
    const thumbnailElement = evt.target.closest('.picture');
    if (!thumbnailElement) {
      return;
    }

    evt.preventDefault();

    const pictureId = Number(thumbnailElement.dataset.pictureId);

    const currentPhoto = data.find((item) => item.id === pictureId);

    if (currentPhoto) {
      openBigPicture(currentPhoto);
    }
  });

  closeButtonElement.addEventListener('click', closeBigPicture);
  commentsLoaderElement.addEventListener('click', renderNextComments);
};

export { initBigPicture };
