// *** module3-1 Generate Temp Data
import { getRandomNumber } from './util.js';

const ARRAY_LENGTH = 25;
const MAX_COMMENTS_COUNT = 7;

const tempNames = ['Иван', 'Петр', 'Мария', 'Артем', 'Ольга', 'Джессика', 'Вальдемар', 'Джон', 'Томми', 'Эдгар', 'Андуин', 'Дантес', 'Катрин', 'Сильванна', 'Шарипутра', 'Дэрион'];
const tempMessage = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const createNewArray = (arrLength, element, shift = 0) => {
  return new Array(arrLength).fill('').map((item, index) => element(index + shift));
};

const createComment = (index) => {
  const commentMessageLength = getRandomNumber(1, 2);

  const createCommentMessage = (length) => {
    const result = [];
    for (let i = 1; i <= length; i++) {
      result.push(tempMessage[getRandomNumber(0, tempMessage.length - 1)]);
    }
    return result.join(' ');
  };

  return {
    id: index + getRandomNumber(1, 300),
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: createCommentMessage(commentMessageLength),
    name: tempNames[getRandomNumber(0, tempNames.length - 1)],
  };
};

const createPhotoDescr = (index) => {
  const arrayOfCommentsLength = getRandomNumber(1, MAX_COMMENTS_COUNT);
  const createArrayOfComments = createNewArray(arrayOfCommentsLength, createComment);

  return {
    id: index,
    url: `./photos/${index}.jpg`,
    description: 'Еще одна фотография',
    likes: getRandomNumber(15, 200),
    comments: createArrayOfComments,
  };
};

const photosDescr = createNewArray(ARRAY_LENGTH, createPhotoDescr, 1);

export { photosDescr };
