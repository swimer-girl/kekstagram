import { isEscapeKey } from './util.js';

const body = document.querySelector('body');
const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');

// Функция скрытия  окна сообщения
function hideMessage() {
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  messageElement.remove();
  body.removeEventListener('keydown', onEscDown);
  body.removeEventListener('click', onBodyClick);
}
//Фнукция для скрытия окна с клавиатуры
function onEscDown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
    hideMessage();
  }
}

function onBodyClick(evt) {
  const isMessage = evt.target.closest('.error, .success');
  if (!isMessage) {
    const openMessage = body.querySelector('.error, .success');
    if (openMessage) {
      body.removeChild(openMessage);
    }
  }
}

const showSuccessMessage = () => {
  body.append(successMessage);
  body.addEventListener('keydown', onEscDown);
  body.addEventListener('click', onBodyClick);
  successMessage
    .querySelector('.success__button')
    .addEventListener('click', hideMessage);
};

const showErrorMessage = () => {
  body.append(errorMessage);
  body.addEventListener('keydown', onEscDown);
  errorMessage
    .querySelector('.error__button')
    .addEventListener('click', hideMessage);
};

export {showSuccessMessage, showErrorMessage};
