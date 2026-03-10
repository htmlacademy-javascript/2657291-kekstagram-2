const imgFormElement = document.querySelector('.img-filters__form');
const RANDOM_PHOTOS_COUNT = 10;

const mostCommented = (a, b) => b.comments.length - a.comments.length;
const getRandom = () => (Math.random() - 0.5);

//Функция алгоритм действий при клике на кнопку фильтрации
function getFilteredPhotos(arrPhotos, filterId) {
  if (filterId === 'filter-random') {
    return [...arrPhotos].sort(getRandom).slice(0, RANDOM_PHOTOS_COUNT);
  } else if(filterId === 'filter-discussed') {
    return [...arrPhotos].sort(mostCommented);
  }

  return [...arrPhotos];
}

//Функция передает в main id
const initFilterListeners = (callback) => {
  imgFormElement.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button') ||
    evt.target.classList.contains('img-filters__button--active')) {
      return;
    }

    // Переключаем подсветку (визуал)
    imgFormElement.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');

    // Сообщаем в main.js, какой фильтр (ID) выбран
    callback(evt.target.id);
  });
};

export { getFilteredPhotos, initFilterListeners };
