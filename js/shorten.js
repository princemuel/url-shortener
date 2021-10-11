import { BASE_URL } from './main';

export const shorten = async (link) => {
  const url = `${BASE_URL}/shorten?url=${link}`;

  const response = await fetch(url);
  const data = await response.json();
  const { ok, result } = data;

  //checks if the status = 200 then pulls out result from the data
  if (ok) {
    console.log(result);
    return result;
  } else {
    //Need an alert component for this
    console.error('There is an error with your request');
  }
};
