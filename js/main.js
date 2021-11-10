import { getElement } from './get-element.js';
import { shorten } from './shorten.js';
import { links, display, linksObjectUpdated } from './display.js';
export const BASE_URL = `https://api.shrtco.de/v2/`;

const linkInput = getElement('#link-input', document);
const submitBtn = getElement('#submit', document);

submitBtn.addEventListener('click', () => {
  let link = linkInput.value;
  
  if (!links.shortenedLink.length) {
    shorten(link);
  } else {
    const shortened = links.shortenedLink.find(linkDetails => linkDetails.original_link  === link)
    if(shortened){
      const index = links.shortenedLink.findIndex(linkDetails => linkDetails.original_link  === link)
      links.shortenedLink = [
        ...links.shortenedLink.slice(0, index),
        ...links.shortenedLink.slice(index + 1)
      ]
      links.shortenedLink.push(shortened)
      display(shortened)
      console.log(links.shortenedLink)
      linksObjectUpdated()
    }else{
      shorten(link)
    }
  }
  
  
});

// linkInput.addEventListener('paste', (e) => {
//   let link = e.clipboardData.getData('text');
//   shorten(link);
// });
