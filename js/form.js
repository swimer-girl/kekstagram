import { isEscapeKey } from './util.js';

const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const bodyElement = document.querySelector('body');
const fileField = document.querySelector('#upload-file');
const cancelButton = document.querySelector('#upload-cancel');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__element',
  errorTextParent: 'img-upload__element',
  errorTextClass: 'img-upload__error',
});
// Валидатор для хэштегов
const validateHashtags = (value) => {
  const hashtagsArray = value.split(' ');
  for (const hashtag of hashtagsArray) {
    // Проверка каждого хэш-тега на соответствие ограничениям
    if (!/^#[A-Za-z0-9]{1,19}$/.test(hashtag)) {
      return false;
    }
  }
  return true;
};
pristine.addValidator(
  hashtagField, 
  validateHashtags, 
  false, 
  'Хэш-тег должен начинаться с символа # и содержать от 1 до 20 букв или цифр, не более 5 тегов, разделенных пробелами');

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
// Обработчик события нажатия клавиши для хэш-тега и комментария
const handleKeyDown = (evt) => {
  if (evt.key === 'Escape') {
    // Проверка, в каком поле находится фокус
    if (evt.target === hashtagField || evt.target === commentField) {
      evt.stopPropagation();
    }
  }
};

// Назначение обработчиков событий
hashtagField.addEventListener('keydown', handleKeyDown);
commentField.addEventListener('keydown', handleKeyDown);

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
// Событие отправки формы
form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    console.log('Форма валидна. Данные могут быть отправлены.');
  } else {
    console.log('Форма содержит неверные значения. Пожалуйста, исправьте ошибки.');
  }
});