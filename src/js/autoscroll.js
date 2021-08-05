import refs from './refs';

function startAutoScroll(local) {
  const autoScrollAnchor = refs.movieContainer;
  if (local) {
    window.scrollTo({
      // scroll to first card + adjustment
      top:
        autoScrollAnchor.firstElementChild.offsetTop +
        autoScrollAnchor.firstElementChild.offsetHeight / 3,
      behavior: 'smooth',
    });
  } else {
    window.scrollTo({
      // scroll to first card + card height
      top:
        autoScrollAnchor.firstElementChild.offsetTop +
        autoScrollAnchor.firstElementChild.offsetHeight,
      behavior: 'smooth',
    });
  }
  console.log('hi from autoscroll, anchor=' + autoScrollAnchor.firstElementChild);
}

export { startAutoScroll };
