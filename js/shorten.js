import { addItems } from './display.js';
import { BASE_URL } from './main.js';

export const _shorten = async (link) => {
  const url = `${BASE_URL}/shorten?url=${link}`;

  try {
    const response = await fetch(url);
    const clonedResponse = response.clone();

    if (!clonedResponse.ok) {
      const clonedData = await clonedResponse.json();
      throw new Error(`code 0${clonedData.error_code} => ${clonedData.error}`);
    }

    const { result } = await response.json();
    addItems(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

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

// fetch(url)
// .then(response => {
//   if (response.ok) return response.json();
//   return response.json().then(response => {throw new Error(response.error)})
// })
// .then(data => {
// //       // the data object returns 2 values => ok and result
//       const { ok, result } = data;
//       if (ok) {
//         addItems(result);
//         return result;
//       } else {
//         //Need an alert component instead of this(for an invalid link)
//         console.error('There is an error with your request');
//       }
// }).catch(error => console.log(error))
