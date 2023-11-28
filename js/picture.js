const container = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPictureElement = (url, description, likes, comments) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  return pictureElement;
};

const renderPictures = (picturesData) => {
  const fragment = document.createDocumentFragment();
  picturesData.forEach(({ url, description, likes, comments }) => {
    const pictureElement = createPictureElement(url, description, likes, comments);
    fragment.appendChild(pictureElement);
      });
    container.appendChild(fragment);
};

export{renderPictures};



