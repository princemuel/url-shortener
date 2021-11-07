import { getElement } from './get-element.js';
import { shorten } from './shorten.js';
export const BASE_URL = `https://api.shrtco.de/v2/`;

const linkInput = getElement('#link-input', document);
const submitBtn = getElement('#submit', document);

submitBtn.addEventListener('click', () => {
  let link = linkInput.value;
  shorten(link);
});

// linkInput.addEventListener('paste', (e) => {
//   let link = e.clipboardData.getData('text');
//   shorten(link);
// });
