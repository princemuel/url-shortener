import { shorten } from './shorten.js';
export const BASE_URL = `https://api.shrtco.de/v2/`;

const form = document.getElementById('form');
const linkInput = document.getElementById('link-input');
const submitBtn = document.getElementById('submit');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let link = linkInput.value;
  console.log(link);
  console.log(shorten(link));
});



// linkInput.addEventListener('paste', (e) => {
//   let link = e.clipboardData.getData('text');
//   shorten(link); 
// });
