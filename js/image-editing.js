import { EFFECTS } from './data.js';

const viewingImageElement = document.querySelector('.img-upload__preview img');

const inputChangingEffectElement = document.querySelector('.effect-level__value');
const effectSliderElement = document.querySelector('.effect-level__slider');

const effectParentElement = document.querySelector('.img-upload__effect-level');
const effectListElement = document.querySelector('.effects__list');

let currentEffect = 'none';

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

const resetEffects = () => {
  currentEffect = 'none';
  viewingImageElement.style.filter = 'none';
  effectParentElement.classList.add('hidden');
};

export { resetEffects };
