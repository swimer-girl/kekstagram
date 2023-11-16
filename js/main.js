const index = () => Array.from({ length: 25 }, (_, i) => i+1)

const createPicture = (index) => ({
  id: index,
  url: 'photos/' + index + '.jpg',
  description: getRandomArrayElement(descriptions),
  likes: getRandomPositiveInteger(15, 200),
  comments: getComments(),
});

const getPictures = () =>
  Array.from({ length: 25 }, (_, pictureIndex) =>
    createPicture(pictureIndex + 1)
  );

const descriptions = [
  'Море',
  'Солнце',
  'Песок',
  'Завтрак',
  'Обед',
  'Ресторан',
];

const createComments = (index) => ({
  id: index,
  avatar: 'img/avatar-' + getRandomPositiveInteger(1, 6) + '.svg',
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const getComments = () =>
  Array.from({ length: 2 }, (_, commentIndex) =>
    createComments(commentIndex + 1)
  );


const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

const checkLenghtString = (string, length) => {
  return string.length <= length;
}

const getRandomArrayElement = (elements) => {
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
};

checkStringLength('', 140);
getPictures();