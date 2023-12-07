const scaleControl = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');
const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');

const SCALE_STEP = 25;
const MAX_SCALE = 100;
const MIN_SCALE = 25;
const DEFAULT_SCALE = 100;

// Функция обновления значения масштаба и применения стилей к изображению
const updateScale = (value = DEFAULT_SCALE) => {
  imgPreview.style.transform = `scale(${value / 100})`;
  scaleControl.value = `${value}%`;
};

// Функция сброса масштаба
const resetScale = () => {
  updateScale(DEFAULT_SCALE); // Устанавливаем максимальное значение шкалы
};

const onSmallerButtonClick = () => {
  const currentScale = parseInt(scaleControl.value, 10);
  const scaleValue = Math.max(currentScale - SCALE_STEP, MIN_SCALE);
  if (scaleValue < MIN_SCALE) {
    scaleValue = MIN_SCALE;
  }
  updateScale(scaleValue);
};

const onBiggerButtonClick = () => {
  const currentScale = parseInt(scaleControl.value, 10);
  const scaleValue = Math.min(currentScale + SCALE_STEP, MAX_SCALE);
  if (scaleValue > MAX_SCALE) {
    scaleValue = MAX_SCALE;
  }
  updateScale(scaleValue);
};

// Обработчики события для изменения масштаба
smallerButton.addEventListener('click', onSmallerButtonClick);
biggerButton.addEventListener('click', onBiggerButtonClick);

// Обработчик события для изменения значения масштаба вручную
scaleControl.addEventListener('change', updateScale);

// Инициализация начального значения масштаба
updateScale(DEFAULT_SCALE);

export {resetScale};
