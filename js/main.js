const getElement = (selector) => {
  const element = document.querySelector(selector);
  if (element) {
    return element;
  }
  throw Error(`Please check your selector, no element matches ${selector} `);
};

const links = getElement('.nav-links');
const navBtn = getElement('.nav-btn');

navBtn.addEventListener('click', () => {
  links.classList.toggle('show-links');
});

const navbar = document.querySelector('.header__nav');
const navToggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.links');
const linksContainer = document.querySelector('.links-container');
// const backToTopLink = document.querySelector('.top-link');

// select links
const scrollLinks = document.querySelectorAll('.scroll-link');

// ********** close links ************
navToggle.addEventListener('click', () => {
  const containerHeight = linksContainer.getBoundingClientRect().height;
  const linksHeight = links.getBoundingClientRect().height;

  if (containerHeight === 0) {
    linksContainer.style.height = `${linksHeight}px`;
    navToggle.innerHTML = `<i class="fas fa-times"></i>`;
  } else {
    linksContainer.style.height = 0;
    navToggle.innerHTML = `<i class="fas fa-bars"></i>`;
  }
});

// ********** fixed navbar ************
window.addEventListener('scroll', () => {
  const scrollHeight = window.scrollY;
  const navHeight = navbar.getBoundingClientRect().height;

  if (scrollHeight > navHeight) {
    navbar.classList.add('header__nav--fixed');
    // backToTopLink.classList.add('show-link');
  } else {
    navbar.classList.remove('header__nav--fixed');
    // backToTopLink.classList.remove('show-link');
  }
});
