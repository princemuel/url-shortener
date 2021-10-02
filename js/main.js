// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

const currentYear = document.getElementById('date');

const navbar = document.querySelector('.header__nav');
const navToggle = document.querySelector('.nav-toggle');
const linksContainer = document.querySelector('.links-container');
const links = document.querySelector('.links');
const backToTopLink = document.querySelector('.top-link');

// select links
const scrollLinks = document.querySelectorAll('.scroll-link');

// ********** set date ************
currentYear.innerHTML = new Date().getFullYear();

// ********** close links ************
navToggle.addEventListener('click', () => {
  const containerHeight = linksContainer.getBoundingClientRect().height;
  const linksHeight = links.getBoundingClientRect().height;

  containerHeight === 0
    ? (linksContainer.style.height = `${linksHeight}px`)
    : (linksContainer.style.height = 0);
});

// ********** fixed navbar ************
window.addEventListener('scroll', () => {
  const scrollHeight = window.scrollY;
  const navHeight = navbar.getBoundingClientRect().height;

  scrollHeight > navHeight
    ? navbar.classList.add('header__nav--fixed') &
      backToTopLink.classList.add('show-link')
    : navbar.classList.remove('header__nav--fixed') &
      backToTopLink.classList.remove('show-link');
  // scrollHeight > 500
  //   ? backToTopLink.classList.add('show-link')
  //   : backToTopLink.classList.remove('show-link');
});

// ********** smooth scroll ************
scrollLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const fixedNav = navbar.classList.contains('header__nav--fixed');
    const id = e.currentTarget.getAttribute('href').slice(1);
    const element = document.getElementById(id);

    let position = element.offsetTop - navHeight;

    if (!fixedNav) {
      position -= navHeight;
    }
    if (navHeight > 82) {
      position += containerHeight;
    }

    window.scrollTo({
      left: 0,
      top: position,
    });

    // closes links on a smaller screen when scrolling
    linksContainer.style.height = 0;
  });
});
