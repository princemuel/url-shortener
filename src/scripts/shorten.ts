import { BASE_URL } from "../../main.js";
import { addItems } from "./display.js";

const header = document.querySelector("header");
const main = document.querySelector("main");
const footer = document.querySelector("footer");
const loader = document.querySelector(".loader");
const attribution = document.querySelector(".attribution");

export const shorten = async (link) => {
  const url = `${BASE_URL}/shorten?url=${link}`;

  loader.classList.remove("loaded");

  header.classList.add("isLoading");
  main.classList.add("isLoading");
  footer.classList.add("isLoading");
  attribution.classList.add("isLoading");

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
        console.error("There is an error with your request");
      }
    })
    .catch((error) => {
      const invalid = document.querySelector("p.invalid");
      const linkInput = document.querySelector("#link-input");
      if (error == "Error: 1") {
        invalid.textContent = "Please add a link, link cannot be empty";
      } else if (error == "Error: 2") {
        invalid.textContent =
          "Invalid URL submitted, please check the link and try again";
      } else if (error == "Error: 3") {
        invalid.textContent = "Too many request, wait a second and try again";
      } else if (error == "Error: 10") {
        invalid.textContent =
          "You are trying to shorten a disallowed Link, please shorten a different link";
      } else {
        invalid.textContent = "Something went wrong please try again later.";
      }
      linkInput.classList.add("invalid");
      invalid.style.display = "block";
      setTimeout(function () {
        linkInput.classList.remove("invalid");
        invalid.style.display = "none";
      }, 4000);
    })
    .finally(() => {
      loader.classList.add("loaded");

      header.classList.remove("isLoading");
      main.classList.remove("isLoading");
      footer.classList.remove("isLoading");
      attribution.classList.remove("isLoading");
    });
};
