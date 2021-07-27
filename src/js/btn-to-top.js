import refs from './refs';

let rootElement = document.documentElement;

function trackScroll() {
  if (rootElement.scrollTop - document.documentElement.clientHeight > 0) {
    refs.buttonToTop.classList.remove('is-hidden');
  } else {
    refs.buttonToTop.classList.add('is-hidden');
  }
}
function backToTop() {
  rootElement.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

refs.buttonToTop.addEventListener('click', backToTop);
window.addEventListener('scroll', trackScroll);
