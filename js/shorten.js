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
    .catch((error) => {
      const invalid = document.querySelector('p.invalid');
      const linkInput = document.querySelector("#link-input")
      if(error == "Error: 1"){
        invalid.textContent = "Please add a link, link cannot be empty";
      }else if(error == "Error: 2"){
        invalid.textContent = "Invalid URL submitted, please check the link and try again";
      }else if(error == "Error: 3"){
        invalid.textContent = "Too many request, wait a second and try again";
      }else if(error == "Error: 10"){
        invalid.textContent = "You are trying to shorten a disallowed Link, please shorten a different link";
      }else{
        invalid.textContent = "Something went wrong please try again later.";
      }
      linkInput.classList.add("invalid")
      invalid.style.display = "block"
      setTimeout(function(){
        linkInput.classList.remove("invalid");
        invalid.style.display = "none"
      },4000);
    });
};
