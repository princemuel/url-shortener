// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

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
