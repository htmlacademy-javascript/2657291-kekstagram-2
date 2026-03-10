const template = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

const clear = () => {
  // Сначала удаляем все старые миниатюры (чтобы не дублировались)
  document.querySelectorAll('.picture').forEach((pic) => pic.remove());
};

//Функция создания фотографий
const renderThumbnails = (photos) => {
  const fragment = document.createDocumentFragment();
  clear();

  photos.forEach((photo) => {
    const thumbnail = template.cloneNode(true);

    const images = thumbnail.querySelector('.picture__img');
    images.src = photo.url;
    images.alt = photo.description;
    thumbnail.dataset.pictureId = photo.id;

    thumbnail.querySelector('.picture__likes').textContent = photo.likes;
    thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;

    fragment.appendChild(thumbnail);
  });

  container.appendChild(fragment);
};

export { renderThumbnails };
