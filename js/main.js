import { shorten } from './shorten.js';
import { display } from './display.js';
export const BASE_URL = `https://api.shrtco.de/v2/`;

const form = document.getElementById('form');
const linkInput = document.getElementById('link-input');
const submitBtn = document.getElementById('submit');

form.addEventListener('submit', (e) => {
  let link = linkInput.value;
  console.log(link);
  console.log(shorten(link));
  console.log(display());
});



// linkInput.addEventListener('paste', (e) => {
//   let link = e.clipboardData.getData('text');
//   shorten(link); 
// });
