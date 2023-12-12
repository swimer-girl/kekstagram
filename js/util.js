const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const checkLenghtString = (string, length) => string.length <= length;

const isEscapeKey = (evt) => evt.key === 'Escape';

// Функция для создания и показа сообщения об ошибке с задержкой
const ALERT_SHOW_TIME = 5000;
const errorMessageTemplate = document.querySelector('#error-message');

const showAlert = () => {
  const errorMessage = errorMessageTemplate.content.cloneNode(true);
  document.body.append(errorMessage);

  // Скрытие сообщения через 5 секунд
  setTimeout(() => {
    errorMessage.remove();
  }, ALERT_SHOW_TIME);
};

export {getRandomArrayElement, getRandomPositiveInteger, checkLenghtString, isEscapeKey, showAlert};


