import { isEscapeKey } from './util.js';
import { resetScale } from './scale.js';
import { resetEffects } from './effect.js';

const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const bodyElement = document.querySelector('body');
const fileField = document.querySelector('#upload-file');
const cancelButton = document.querySelector('#upload-cancel');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');

// Лимит на количество хештегов и длину комментария
const MAX_HASHTAGS = 5;
const COMMENT_MAX_LENGTH = 140;

const pristine = new Pristine(form, {
  classTo: 'img-upload__element',
  errorTextParent: 'img-upload__element',
  errorTextClass: 'img-upload__error',
});

// Функция для отображения формы редактирования изображения
const showModal = () => {
  overlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyDown);
};

// Функция скрытия формы отображения окна изображения
const hideModal = () => {
  form.reset();
  resetScale();
  resetEffects();
  pristine.reset();
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

const onCancelButtonClick = () => {
  hideModal();
};

const onFileInputChange = () => {
  showModal();
};

// Валидатор для хэштегов
const validateHashtags = (value) => {
  const hashtags = value.trim().toLowerCase().split(' ');
  const isUnique = new Set(hashtags).size === hashtags.length;
  const isValidFormat = hashtags.every((tag) => /^#[a-zA-Z0-9]{1,19}$/.test(tag));
  return isUnique && isValidFormat && hashtags.length <= MAX_HASHTAGS;
};
pristine.addValidator(
  hashtagField,
  validateHashtags,
  'Некорректный формат хештега'
);

const validateDescription = (value) => value.length < COMMENT_MAX_LENGTH;

pristine.addValidator(
  commentField,
  validateDescription,
  'Не более 140 символов'
);

// Назначение обработчиков событий
hashtagField.addEventListener('keydown', handleKeyDown);
commentField.addEventListener('keydown', handleKeyDown);

//Блокировка кнопки после нажатия отправить
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляется...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

// Обработчик события изменения значения элемента #upload-file
fileField.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);
// Событие отправки формы
const setOnFormSubmit = (cb) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      await cb(new FormData(form));
      unblockSubmitButton();
    }
  });
};

export {setOnFormSubmit, hideModal};
