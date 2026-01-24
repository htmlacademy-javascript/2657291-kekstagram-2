// eslint-disable-next-line no-unused-vars
import {messages, names, descriptions} from './data.js';

//Функция для генерации случайного числа из диапазона
const getRandomInteger = (minValue, maxValue) => {
  const lower = Math.ceil(Math.min(minValue, maxValue));
  const upper = Math.floor(Math.max(minValue, maxValue));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//Функция для создания массива из уникальных чисел в указанном диапазоне
const getUniqueNumber = (minValue, maxValue) => {
  const numbers = [];

  for (let i = minValue; i <= maxValue; i++) {
    numbers.push(i);
  }
  return numbers;
};

//Функция для выбора случайного элемента из массива
const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];


export {getRandomInteger, getUniqueNumber, getRandomArrayElement};
