import { addItems } from './display.js';
import { BASE_URL } from './main.js';

export const shorten = async (link) => {
  const url = `${BASE_URL}/shorten?url=${link}`;

  fetch(url)
    .then((response) => {
      if (response.ok) return response.json();
      return response.json().then((response) => {
        throw new Error(response.error_code);
      });
    })
    .then((data) => {
      // the data object returns 2 values => ok and result
      const { ok, result } = data;
      if (ok) {
        addItems(result);
        return result;
      } else {
        //Need an alert component instead of this(for an invalid link)
        console.error('There is an error with your request');
      }
    })
    .catch((error) => console.log(error));
};
