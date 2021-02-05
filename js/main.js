//  *** Generate Random Number

const getRandomNumber = (a = 0, b = 0) => {
  const min = Math.ceil(Math.min(a, b));
  const max = Math.floor(Math.max(a, b));

  // * Another solution
  // const min = Math.ceil((a < b) ? a : b);
  // const max = Math.floor((a >= b) ? a : b);

  if (min < 0) {
    return NaN;
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
};

getRandomNumber(2, 20); // for ESLint Validation

// *** Check Max String Length

const checkMaxLength = (value = '', maxLength = 140) => value.length <= maxLength;

checkMaxLength(); // for ESLint Validation

// *** module3-1 Generate Temp Data

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

const createComment = (i) => {
  const commentMessageLength = getRandomNumber(1, 2);

  const createCommentMessage = (length) => {
    const result = [];
    for (let i = 1; i <= length; i++) {
      result.push(tempMessage[getRandomNumber(0, tempMessage.length - 1)]);
    }
    return result.join(' ');
  };

  return {
    id: i + getRandomNumber(1, 300),
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: createCommentMessage(commentMessageLength),
    name: tempNames[getRandomNumber(0, tempNames.length - 1)],
  };
};

const createPhotoDescr = (index) => {
  const arrayOfCommentsLength = getRandomNumber(1, MAX_COMMENTS_COUNT);
  const createArrayOfComments = new Array(arrayOfCommentsLength).fill('').map((item, i) => createComment(i));

  index++;
  return {
    id: index,
    url: `photos/${index}.jpg`,
    description: 'Еще одна фотография',
    likes: getRandomNumber(15, 200),
    comments: createArrayOfComments,
  };
};

const arrayOfPhotoDescr = new Array(ARRAY_LENGTH).fill('').map((item, index) => createPhotoDescr(index));

arrayOfPhotoDescr; // for ESLint Validation

// ОПИСАНИЕ:
//Создать массив из 25 объектов
// каждый объект: {
//  id: уникальное число 1-25
//  url: строка photos/${id}.jpg
//  description: описание любое
//  likes: число random 15-200
//  comments: массив объектов, длина массива на свое усмотрение, пример:
//           {
//             id: 135,
//             avatar: 'img/avatar-6.svg',
//             message: 'В целом всё неплохо. Но не всё.',
//             name: 'Артем',
//           }
//            id - уникальное случайное число
//            avatar - строка img/avatar-{{случайное число от 1 до 6}}.svg
//            message - строка из одного или двух предложений:
//                       Всё отлично!
//                       В целом всё неплохо. Но не всё.
//                       Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.
//                       Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.
//                       Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.
//                       Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!
//            name - строка из случайного имени, набор имен сделать самостоятельно.
