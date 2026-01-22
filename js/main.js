const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const names = [
  'Вася',
  'Катя',
  'Коля',
  'Лена',
  'Егор',
  'Артур',
  'Саша',
  'Петр',
  'Сергей',
];

const descriptions = [
  'Лето',
  'Круто',
  'Огонь',
  'Лена',
  'Имба',
  'Так себе',
  'Кот',
  'Лес',
  'Река',
];


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

//Генератор уникальных id
function createUniqueIdGenerator(min, max) {
  const usedIds = new Set();

  return function generateUniqueId() {
    let newId;

    do {
      newId = getRandomInteger(min, max);
      // usedIds.has(newId) вернет true, если номер уже есть
    } while (usedIds.has(newId));
    usedIds.add(newId);

    return newId;
  };
}

// Создаем  уникальные ID для комментариев
const generateCommentId = createUniqueIdGenerator(1, 1000);

//Функция для создания комментария
const createComment = () => {
  const avatarNumber = getRandomInteger(1, 6);
  const avatarPath = `img/avatar-${avatarNumber}.svg`;
  const randomMessage = getRandomArrayElement(messages);
  const randomName = getRandomArrayElement(names);

  return {
    id: generateCommentId(),
    avatar: avatarPath,
    message: randomMessage,
    name: randomName
  };
};

//Функция для создания массива коментариев
const createComments = () => {
  const amount = getRandomInteger(0, 30);
  const commentsList = [];

  for (let i = 0; i < amount; i++) {
    const newComment = createComment();
    commentsList.push(newComment);
  }

  return commentsList;
};

//Функция для создание объектов с коментариями
const createNewObject = (id) => ({
  id: id,
  url: `photos/${ id }.jpg`,
  description: getRandomArrayElement(descriptions),
  likes: getRandomInteger(15, 200),
  comments: createComments(),
});

// Создание объектов
// eslint-disable-next-line no-unused-vars
const generatedObjects = () => {
  const uniqueIds = getUniqueRandomNumbers(25, 1, 25);
  return uniqueIds.map((currentId) => createNewObject(currentId));
};


