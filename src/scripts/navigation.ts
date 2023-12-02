import { queryElement } from './query-element';

const navigation = queryElement<HTMLUListElement>(
  '[data-id="primary-navigation-mobile"]'
);
const toggle = queryElement<HTMLButtonElement>('[data-id="mobile-toggle"]');

toggle.addEventListener('click', () => {
  const visibility = navigation.getAttribute('data-visible');

  if (!visibility || visibility === 'false') {
    navigation.setAttribute('data-visible', 'true');
    toggle.setAttribute('aria-expanded', 'true');
  } else {
    navigation.setAttribute('data-visible', 'false');
    toggle.setAttribute('aria-expanded', 'false');
  }
});
