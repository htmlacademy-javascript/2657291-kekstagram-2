import { generatedObjects } from './creating-objects-photo-description.js';

const template = document.querySelector('#picture').content.querySelector('.picture');

const mockedPhotos = generatedObjects();
const container = document.querySelector('.pictures');

const fragment = document.createDocumentFragment();

mockedPhotos.forEach((photo) => {
  const thumbnail = template.cloneNode(true);
  const images = thumbnail.querySelector('.picture__img');
  images.src = photo.url;
  images.alt = photo.description;

  thumbnail.querySelector('.picture__likes').textContent = photo.likes;
  thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;

  fragment.appendChild(thumbnail);
});

container.appendChild(fragment);
