import { getElement } from './get-element.js';

// if statements to check local storage status i.e empty or not
export let links = localStorage.getItem('shortenedLinks')
  ? JSON.parse(localStorage.getItem('shortenedLinks'))
  : {
      shortenedLink: [],
    };
// function to add my shortenedLinks to local storage
export function linksObjectUpdated() {
  localStorage.setItem('shortenedLinks', JSON.stringify(links));
}

// I imported this in the shorten.js beacuse I need the display function to be called only after the response has been gotten
export const addItems = (value) => {
  // call the display function
  display(value);
  // empty out the input field
  document.getElementById('link-input').value = '';
  // create an object and assign it the values we want to store
  let linkDetails = {
    code: value.code,
    original_link: value.original_link,
    full_short_link: value.full_short_link,
  };
  // push the object unto our shortenedLink array
  links.shortenedLink.push(linkDetails);

  // call the function to store the updated links in local storage
  linksObjectUpdated();
};

// Function to dispay the result in the dom, I think the eventlistener for the copy button should go here too
export const display = (data) => {
  // get the ul element
  let list = document.querySelector('.shortened-links');

  // creates an li element and give it a class
  let item = document.createElement('li');
  item.classList.add('shortened-link');

  let leftDiv = document.createElement('div');
  leftDiv.classList.add('shortened-link--left');
  let para = document.createElement('p');
  para.textContent = data.original_link;
  para.title = data.original_link;

  let rightDiv = document.createElement('div');
  rightDiv.classList.add('shortened-link--right');
  let aLink = document.createElement('a');
  aLink.textContent = data.full_short_link;
  aLink.href = data.full_short_link;
  aLink.target = '_blank';
  aLink.id = data.code;
  let button = document.createElement('button');
  button.classList.add('btn', 'btn-primary', 'btn-large');
  button.textContent = 'copy';

  leftDiv.appendChild(para);
  rightDiv.appendChild(aLink);
  rightDiv.appendChild(button);
  item.appendChild(leftDiv);
  item.appendChild(rightDiv);

  /* NOTE:
   *   WE MIGHT NEED TO SLIPT UP OUR JS CODE INTO FILES
   *   THEN PIPE EVERYTHING INTO MAIN.JS
   *  T'WILL HELP MAKE OUR CODE CLEANER AND EASIER TO MAINTAIN
   **/

  /* This code's function enables copying data to the clipboard
   * it iterates 2ru the shortened links and adds the btn-secondary
   * class to only the selected btn
   * it also
   * NOTE: we need to refactor our btn css;
   **/

  /* USING THIS TO ITERATE THROUGH THE BTNS WHEN CLICKED */
  item.addEventListener('click', (e) => {
    const shortenedLinks = getElement('.shortened-link', document, true);
    const selectedLink = e.currentTarget;
    const clickedBtn = getElement('.btn', selectedLink);
    const a = getElement('a', selectedLink);

    const text = a.textContent;
    copyToClipboard(text);

    shortenedLinks.forEach((listItem) => {
      const prevBtn = getElement('.btn', listItem);

      // removes the purple color from all btns not selected
      if (listItem !== selectedLink) {
        prevBtn.className = 'btn btn-primary btn-large';
        prevBtn.textContent = 'copy';
      }
    });

    // adds the purple color to the selected btn
    clickedBtn.className = 'btn btn-secondary btn--copied';
    clickedBtn.textContent = 'copied';
  });

  // insert ontop of the previous link
  list.insertBefore(item, list.children[0]);

  /* REMOVED THIS BECAUSE OF A MEMORY LEAK */
  // shortenedLinks.forEach((selectedLink, _, self) => {
  //   const copyBtn = getElement('.btn', selectedLink);

  //   copyBtn.addEventListener('click', () => {
  //     console.log(self);
  //     const a = getElement('a', selectedLink);
  //     const text = a.textContent;

  //     self.forEach((listItem) => {
  //       const itemBtn = getElement('.btn', listItem);

  //       // removes the purple color from all btns not selected
  //       if (listItem !== selectedLink) {
  //         itemBtn.className = 'btn btn-primary btn-large';
  //         itemBtn.textContent = 'copy';
  //       }
  //     });

  //     // this copies the text inside the tag to the clipboard
  //     copyToClipboard(text);

  //     // adds the purple color to the selected btn
  //     copyBtn.className = 'btn btn-secondary btn--copied';
  //     copyBtn.textContent = 'copied';
  //   });
  // });
};

function renderLinks() {
  // if shortenedLink array is empty return nothing close function
  if (!links.shortenedLink.length) return;

  for (let i = 0; i < links.shortenedLink.length; i++) {
    let value = links.shortenedLink[i];
    display(value);
  }
}

function copyToClipboard(linkToCopy) {
  // this initiaites a query for permission to copy to the clipboard: it's async
  navigator.permissions.query({ name: 'clipboard-write' }).then((result) => {
    // it returns a permission status as: granted || denied || prompt
    if (result.state == 'granted' || result.state == 'prompt') {
      function updateClipboard() {
        navigator.clipboard.writeText(linkToCopy).then(
          function () {
            // suggestion: we could add alerts here or in the error for UX
            console.log(
              'Your data has been successfully copied to the clipboard'
            );
          },
          function () {
            throw new Error(
              'Nothing was copied, pls check your code and try again'
            );
          }
        );
      }
      // the function is called here
      updateClipboard();
    }
  });
}

// call render links
renderLinks();
