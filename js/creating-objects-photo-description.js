import {messages, names, descriptions} from './data.js';
import {getRandomInteger, getUniqueRandomNumbers, getRandomArrayElement} from './util.js';

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
const generatedObjects = () => {
  const uniqueIds = getUniqueRandomNumbers(25, 1, 25);
  return uniqueIds.map((currentId) => createNewObject(currentId));
};

export {generatedObjects};
