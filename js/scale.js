const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const scaleContainer = document.querySelector('.img-upload__scale');
const reduceImageElement = scaleContainer.querySelector('.scale__control--smaller');
const enlargeImageElement = scaleContainer.querySelector('.scale__control--bigger');
const inputImageElement = scaleContainer.querySelector('.scale__control--value');
const viewingImageElement = document.querySelector('.img-upload__preview img');

let currentScale = DEFAULT_SCALE;


const renderScale = () => {
  inputImageElement.value = `${currentScale }%`;
  viewingImageElement.style.transform = `scale(${currentScale}%)`;
};

reduceImageElement.addEventListener('click', () => {
  if (currentScale > MIN_SCALE) {
    currentScale -= SCALE_STEP;
    renderScale();
  }
});

enlargeImageElement.addEventListener('click', () => {
  if (currentScale < MAX_SCALE) {
    currentScale += SCALE_STEP;
    renderScale();
  }
});

export const resetScale = () => {
  inputImageElement.value = `${DEFAULT_SCALE}%`;
  viewingImageElement.style.transform = `scale(${DEFAULT_SCALE}%)`;

  currentScale = DEFAULT_SCALE;
  renderScale();
};

