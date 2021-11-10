import { getElement } from './get-element.js';

const navbar = getElement('.nav', document);
const navBtn = getElement('.nav-toggle', document);
const linksLeft = getElement('.nav-links--left', document);
const linksRight = getElement('.nav-links--right', document);
const linksContainer = getElement('.nav-links', document);
const backToTopLink = getElement('.top-link', document);

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
