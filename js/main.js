import { getPictures } from './data.js';
import { renderPictures } from './picture.js';
import { showModal} from './form.js';

renderPictures(getPictures());
showModal();
