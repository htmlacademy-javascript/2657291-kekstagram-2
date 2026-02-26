const scaleContainer = document.querySelector('.img-upload__scale'); //родительский контейнер
const reduceImageElement = scaleContainer.querySelector('.scale__control--smaller'); //кнопка уменьшения изображения
const enlargeImageElement = scaleContainer.querySelector('.scale__control--bigger'); //кнопка увеличения изображения
const inputImageElement = scaleContainer.querySelector('.scale__control--value'); //input
const viewingImageElement = document.querySelector('.img-upload__preview img'); //предварительный просмотр изображения img

const inputChangingEffectElement = document.querySelector('.effect-level__value'); //input Изменение глубины эффекта, накладываемого на изображение
const effectSliderElement = document.querySelector('.effect-level__slider'); //div где отображается ползунок слайдера

const effectParentElement = document.querySelector('.img-upload__effect-level'); //блок-родитель выбранного эффекта
const effectListElement = document.querySelector('.effects__list'); //ul c эффектами
let currentEffect = 'none';

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

//Функция уменьшения изображения
reduceImageElement.addEventListener('click', () => {
  const currentValue = inputImageElement.value; //текущее значение input
  let currentNumber = parseInt(currentValue, 10); //приводим это значение к числу

  // Проверяем и уменьшаем
  if (currentNumber > MIN_SCALE) {
    currentNumber = currentNumber - SCALE_STEP;

    // ОБНОВЛЯЕМ сам input (важно!)
    inputImageElement.value = `${currentNumber }%`;

    // Меняем размер изображения
    viewingImageElement.style.transform = `scale(${currentNumber / 100})`;
  }
});

//Функция увеличения изображения
enlargeImageElement.addEventListener('click', () => {
  const currentValue = inputImageElement.value; //текущее значение input
  let currentNumber = parseInt(currentValue, 10); //приводим это значение к числу

  // Проверяем и уменьшаем
  if (currentNumber < MAX_SCALE) {
    currentNumber += SCALE_STEP;

    // ОБНОВЛЯЕМ сам input (важно!)
    inputImageElement.value = `${currentNumber }%`;

    // Меняем размер изображения
    viewingImageElement.style.transform = `scale(${currentNumber / 100})`;
  }
});

/* Изменение глубины эффекта, накладываемого на изображение */
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

const EFFECTS = {
  chrome: {
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },

  sepia: {
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },

  marvin: {
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },

  phobos: {
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },

  heat: {
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },

  none: {
    filter: 'none',
  }
};

/*Функция передает значение из слайдера в CSS*/
effectSliderElement.noUiSlider.on('update', () => {
  const currentValue = effectSliderElement.noUiSlider.get(); //получаем число из слайдера
  inputChangingEffectElement.value = currentValue; //записали значение в input полученное из слайдера

  const config = EFFECTS[currentEffect];

  if (currentEffect === 'none' || currentEffect === 'original') {
    viewingImageElement.style.filter = 'none';
    effectParentElement.classList.add('hidden'); // Скрываем слайдер
  } else {
    effectParentElement.classList.remove('hidden');
    viewingImageElement.style.filter = `${config.filter}(${currentValue}${config.unit})`;
  }
});

/* Прослушиватель переключения */
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
      start: config.max, // По ТЗ начинаем всегда с максимума (100%)
      step: config.step,
    });
  }
});

// Функция сброса масштаба
const resetScale = () => {
  inputImageElement.value = `${DEFAULT_SCALE}%`;
  viewingImageElement.style.transform = `scale(${DEFAULT_SCALE / 100})`;
};

// Функция сброса эффектов (понадобится при закрытии)
const resetEffects = () => {
  currentEffect = 'none';
  viewingImageElement.style.filter = 'none';
  effectParentElement.classList.add('hidden');
};

// Экспортируем функции, чтобы они стали видны в других файлах
export { resetScale, resetEffects };

//effectSliderElement.noUiSlider.destroy();   удаляет слайдер
//effectSliderElement.setAttribute('disabled', true); Блокирует слайдер
// sliderElement.removeAttribute('disabled');    разблокирует

