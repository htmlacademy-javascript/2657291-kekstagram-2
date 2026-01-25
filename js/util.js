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

export {getRandomInteger, getUniqueRandomNumbers, getRandomArrayElement};
