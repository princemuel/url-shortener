import { shorten } from './shorten.js';

export const BASE_URL = `https://api.shrtco.de/v2/`;

const form = document.getElementById('form');
const linkInput = document.getElementById('link-input');
const submitBtn = document.getElementById('submit');

linkInput.addEventListener('paste', (e) => {
  let link = e.clipboardData.getData('text');
  shorten(link);
});
