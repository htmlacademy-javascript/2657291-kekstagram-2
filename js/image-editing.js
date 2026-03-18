import { EFFECTS } from './data.js';

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const scaleContainer = document.querySelector('.img-upload__scale');
const reduceImageElement = scaleContainer.querySelector('.scale__control--smaller');
const enlargeImageElement = scaleContainer.querySelector('.scale__control--bigger');
const inputImageElement = scaleContainer.querySelector('.scale__control--value');
const viewingImageElement = document.querySelector('.img-upload__preview img');

const inputChangingEffectElement = document.querySelector('.effect-level__value');
const effectSliderElement = document.querySelector('.effect-level__slider');

const effectParentElement = document.querySelector('.img-upload__effect-level');
const effectListElement = document.querySelector('.effects__list');
let currentEffect = 'none';

reduceImageElement.addEventListener('click', () => {
  const currentValue = inputImageElement.value;
  let currentNumber = parseInt(currentValue, 10);

  if (currentNumber > MIN_SCALE) {
    currentNumber = currentNumber - SCALE_STEP;

    inputImageElement.value = `${currentNumber }%`;

    viewingImageElement.style.transform = `scale(${currentNumber / 100})`;
  }
});

enlargeImageElement.addEventListener('click', () => {
  const currentValue = inputImageElement.value;
  let currentNumber = parseInt(currentValue, 10);

  if (currentNumber < MAX_SCALE) {
    currentNumber += SCALE_STEP;

    inputImageElement.value = `${currentNumber }%`;

    viewingImageElement.style.transform = `scale(${currentNumber / 100})`;
  }
});

noUiSlider.create(effectSliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  }
});

effectSliderElement.noUiSlider.on('update', () => {
  const currentValue = effectSliderElement.noUiSlider.get();
  inputChangingEffectElement.value = currentValue;

  const config = EFFECTS[currentEffect];

  if (currentEffect === 'none' || currentEffect === 'original') {
    viewingImageElement.style.filter = 'none';
    effectParentElement.classList.add('hidden');
  } else {
    effectParentElement.classList.remove('hidden');
    viewingImageElement.style.filter = `${config.filter}(${currentValue}${config.unit})`;
  }
});

effectListElement.addEventListener('change', (evt) => {
  currentEffect = evt.target.value;
  const config = EFFECTS[currentEffect];

  if (currentEffect === 'none') {
    effectParentElement.classList.add('hidden');
    viewingImageElement.style.filter = 'none';
  } else {
    effectParentElement.classList.remove('hidden');

    effectSliderElement.noUiSlider.updateOptions({
      range: {
        min: config.min,
        max: config.max,
      },
      start: config.max,
      step: config.step,
    });
  }
});

const resetScale = () => {
  inputImageElement.value = `${DEFAULT_SCALE}%`;
  viewingImageElement.style.transform = `scale(${DEFAULT_SCALE / 100})`;
};

const resetEffects = () => {
  currentEffect = 'none';
  viewingImageElement.style.filter = 'none';
  effectParentElement.classList.add('hidden');
};

export { resetScale, resetEffects };
