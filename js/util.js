//Функция для генерации случайного числа из диапазона
const getRandomInteger = (minValue, maxValue) => {
  const lower = Math.ceil(Math.min(minValue, maxValue));
  const upper = Math.floor(Math.max(minValue, maxValue));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//Функция сщздания массива уникальных чисел
const getUniqueRandomNumbers = (count, minValue, maxValue) => {
  const uniqueNumbers = new Set();

  while (uniqueNumbers.size < count) {
    uniqueNumbers.add(getRandomInteger(minValue, maxValue));
  }

  return Array.from(uniqueNumbers);
};

//Функция для выбора случайного элемента из массива
const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

//Функция не дает перерисоввать фотографии слишком быстро, обнуляет таймер перерисовки
const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomInteger, getUniqueRandomNumbers, getRandomArrayElement, debounce};
