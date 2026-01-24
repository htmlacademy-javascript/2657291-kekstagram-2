import {getRandomInteger, getUniqueNumber, getRandomArrayElement} from './util.js';
import {messages, names, descriptions} from './data.js';

//Функция для создания случайного комментария
const NewComments = () => {
  const randomId = getRandomInteger(1, 200);
  const randomAvatar = `img/avatar-${ getRandomInteger(1, 6) }.svg`;
  const randomMessage = messages[getRandomInteger(0, messages.length - 1)];
  const randomName = names[getRandomInteger(0, names.length - 1)];

  return {
    id: randomId,
    avatar: randomAvatar,
    message: randomMessage,
    name: randomName,
  };
};

//Функция для создания нового объекта описания фотографии
const createNewObject = () => {
  const uniqueId = getRandomArrayElement(getUniqueNumber(1,25));
  const randomUrl = `photos/${ uniqueId }.jpg`;
  const description = descriptions[0];
  const randomLikes = (getRandomInteger(15, 200));

  return {
    id: uniqueId,
    url: randomUrl,
    description: description,
    likes: randomLikes,
    comments: NewComments(),
  };
};

// eslint-disable-next-line no-unused-vars
const generatedObjects = Array.from({length: 25}, createNewObject);

export {generatedObjects};
