import {renderPictures} from './picture.js';
import { debounce } from './util.js';

const filterElement = document.querySelector('.img-filters');

const PICTURES_COUNT = 10;
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

let currentFilter = '';
let pictures = [];

//Показывает блок фильтрации после успешной загрузки
const turnFilterOn = (loadedPictures) => {
  filterElement.classList.remove('img-filters--inactive');
  pictures = [...loadedPictures];
  currentFilter = Filter.DEFAULT;
};

//Функция фильтрации
const randomSort = () => Math.random() - 0.5;

const discussedSort = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

const filterPictures = () => {
  switch (currentFilter) {
    case Filter.RANDOM:
      return [...pictures].sort(randomSort).slice(0, PICTURES_COUNT);
    case Filter.DISCUSSED:
      return [...pictures].sort(discussedSort);
    default:
      return [...pictures];
  }
};

//Переключение между фильтрами по клику пользователя
const debounceRenderPictures = debounce(renderPictures);

filterElement.addEventListener('click', (evt) => {
  if (!evt.target.classList.contains('img-filters__button')) {
    return;
  }

  const clickedButton = evt.target;
  if (clickedButton.id === currentFilter) {
    return;
  }

  filterElement.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');

  clickedButton.classList.add('img-filters__button--active');
  currentFilter = clickedButton.id;
  debounceRenderPictures(filterPictures());
});

export {turnFilterOn, filterPictures};
