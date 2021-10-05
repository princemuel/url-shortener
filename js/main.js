function getElement(selector) {
  const element = document.querySelector(selector);

  if (element) return element;
  throw Error(`Please check your selector, no element matches ${selector} `);
}

const navbar = getElement('.nav');
const navBtn = getElement('.nav-toggle');
const linksLeft = getElement('.nav-links--left');
const linksRight = getElement('.nav-links--right');
const linksContainer = getElement('.nav-links');
const backToTopLink = getElement('.top-link');

// ********** close links ************
navBtn.addEventListener('click', () => {
  const containerHeight = linksContainer.getBoundingClientRect().height;
  const linksHeight =
    linksLeft.getBoundingClientRect().height +
    linksRight.getBoundingClientRect().height;

  if (containerHeight === 0) {
    linksContainer.style.height = `${linksHeight}px`;
    navBtn.innerHTML = `<i class="fas fa-times"></i>`;
  } else {
    linksContainer.style.height = 0;
    navBtn.innerHTML = `<i class="fas fa-bars"></i>`;
  }
});

// ********** fixed navbar ************
window.addEventListener('scroll', () => {
  const scrollHeight = window.scrollY;
  const navHeight = navbar.getBoundingClientRect().height;

  if (scrollHeight > navHeight) {
    navbar.classList.add('nav--fixed');
    backToTopLink.classList.add('show-link');
  } else {
    navbar.classList.remove('nav--fixed');
    backToTopLink.classList.remove('show-link');
  }
});
