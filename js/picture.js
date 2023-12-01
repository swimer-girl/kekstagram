import { showBigPicture } from './big-picture.js';

const container = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPictureElement = (data) => {
  const {url, description, likes, comments} = data;
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  pictureElement.addEventListener('click', () => {
    showBigPicture(data);
  });

  return pictureElement;
};

const renderPictures = (picturesData) => {
  const fragment = document.createDocumentFragment();
  picturesData.forEach((pictureElement) => {
    const picture= createPictureElement(pictureElement);
    fragment.append(picture);
  });
  container.append(fragment);
};

export{renderPictures};
