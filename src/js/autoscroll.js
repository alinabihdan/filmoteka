import refs from './refs';

function startAutoScroll() {
  const autoScrollAnchor = refs.movieContainer;
  window.scrollTo({
    // scroll to movie container + card height + small adjustment
    top: autoScrollAnchor.offsetTop + autoScrollAnchor.firstElementChild.offsetHeight - 50,
    behavior: 'smooth',
  });
}

export { startAutoScroll };
