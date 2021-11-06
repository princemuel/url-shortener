// if statements to check local storage status i.e empty or not
let links = localStorage.getItem('shortenedLinks')
  ? JSON.parse(localStorage.getItem('shortenedLinks'))
  : {
      shortenedLink: [],
    };
// function to add my shortenedLinks to local storage
function linksObjectUpdated() {
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
const display = (data) => {
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
  button.classList.add('btn', 'btn-primary', 'btn-large', 'btn--white');
  button.textContent = 'copy';

  leftDiv.appendChild(para);
  rightDiv.appendChild(aLink);
  rightDiv.appendChild(button);
  item.appendChild(leftDiv);
  item.appendChild(rightDiv);

  // insert ontop of the previous link
  list.insertBefore(item, list.children[0]);

  /* NOTE:
   *   WE MIGHT NEED TO SLIPT UP OUR JS CODE INTO FILES
   *   THEN PIPE EVERYTHING INTO MAIN.JS
   *
   **/

  if (button) {
    button.addEventListener('click', (e) => {
      // this will help to select the a-tag after it has been instantiated
      const a = item.querySelector('a');
      const text = a.textContent;

      // this copies the text inside the tag to the clipboard
      copyToClipboard(text);

      const btn = e.currentTarget;
      // this overwrites the classname of the btn
      btn.className = 'btn btn-secondary btn-large btn--white';
      btn.textContent = 'copied';

      // cheating a bit here: it resets the btn to former after 5 secs
      // will add the other method later
      setTimeout(() => {
        btn.className = 'btn btn-primary btn-large btn--white';
        btn.textContent = 'copy';
      }, 5000);
    });
  }
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
