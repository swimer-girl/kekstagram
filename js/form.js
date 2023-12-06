import { isEscapeKey } from './util.js';

const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const bodyElement = document.querySelector('body');
const fileField = document.querySelector('#upload-file');
const cancelButton = document.querySelector('#upload-cancel');

// Функция скрытия формы отображения окна изображения
const hideModal = () => {
  overlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
};
//Фнукция для скрытия окна с клавиатуры
function onEscKeyDown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideModal();
  }
}

const onCancelButtonClick = () => {
  hideModal();
};
// Функция для отображения формы редактирования изображения
const showModal = () => {
  overlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyDown);
}

// Обработчик события изменения значения элемента #upload-file
fileField.addEventListener('change', showModal);
cancelButton.addEventListener('click', onCancelButtonClick);


export {showModal};
