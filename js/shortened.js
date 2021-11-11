import { addItems } from './display';
import { BASE_URL } from './main';

/* Working On These */

// please check them out and see if you can refatcor them
const promiser = async (promise) => {
  try {
    const data = await promise;
    //it should return data (if true) or null
    return [data, null];
  } catch (error) {
    //it should return error (if true) or null
    return [null, error];
  }
};

export const _shorten = async (link) => {
  const url = `${BASE_URL}/shorten?url=${link}`;

  // for each promiser call, we should be able to access the data or error if either is true
  // but i'm currently accessing only the data even if it was successfull or not
  // if it was not successfull, the error still logs as data
  // if(data) error should log as null
  // if(error) data should log as null
  const [data, error] = await promiser(fetch(url));
  console.log(data);
  console.log(error);

  const [data1, error1] = await promiser(data.json());
  console.log(data1);
  console.log(error1);

  const { result } = data1;
  addItems(result);
  return result;
};

export const shorten = async (link) => {
  const url = `${BASE_URL}/shorten?url=${link}`;

  try {
    const response = await fetch(url);
    const clonedResponse = response.clone();

    if (!clonedResponse.ok) {
      const clonedData = await clonedResponse?.json();
      throw new Error(`code 0${clonedData.error_code} => ${clonedData.error}`);
    }

    const { result } = await response?.json();
    addItems(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};
