import { BASE_URL } from './main.js';

export const shorten = async (link) => {
  const url = `${BASE_URL}/shorten?url=${link}`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const msg = `There was an error "${response.status} ${response.statusText}"`;
      throw new Error(msg);
    }

    const data = await response.json();
    console.log(data);
    // the data object returns 2 values => ok and result
    const { ok, result } = data;
    if (ok) {
      console.log(result);
      return result;
    } else {
      //Need an alert component instead of this(for an invalid link)
      console.error('There is an error with your request');
    }
  } catch (error) {
    throw new Error(error);
  }
};
