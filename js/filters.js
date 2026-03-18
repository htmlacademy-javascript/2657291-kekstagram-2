import { renderThumbnails } from './rendering-thumbnails.js';
import { debounce } from './util.js';

const RANDOM_PHOTOS_COUNT = 10;
const TIMEOUT_DELAY = 500;

const imgFormElement = document.querySelector('.img-filters__form');
const filterElement = document.querySelector('.img-filters');

let localPhotos;

const mostCommented = (a, b) => b.comments.length - a.comments.length;
const getRandom = () => (Math.random() - 0.5);

function getFilteredPhotos(arrPhotos, filterId) {
  if (filterId === 'filter-random') {
    return [...arrPhotos].sort(getRandom).slice(0, RANDOM_PHOTOS_COUNT);
  } else if(filterId === 'filter-discussed') {
    return [...arrPhotos].sort(mostCommented);
  }

  return [...arrPhotos];
}

const debouncedRenderThumbnails = debounce((filterId) => {
  const filteredPhotos = getFilteredPhotos(localPhotos, filterId);
  renderThumbnails(filteredPhotos);
}, TIMEOUT_DELAY);

imgFormElement.addEventListener('click', (evt) => {
  if (!evt.target.classList.contains('img-filters__button') ||
  evt.target.classList.contains('img-filters__button--active')) {
    return;
  }

  imgFormElement.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');

  debouncedRenderThumbnails(evt.target.id);
});

export const initFilters = (pictures) => {
  filterElement.classList.remove('img-filters--inactive');
  localPhotos = [...pictures];
};

export { getFilteredPhotos };
