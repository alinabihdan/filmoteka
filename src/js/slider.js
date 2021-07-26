import Glide from '@glidejs/glide';
import refs from './refs';
import sliderCardTemplate from '../templates/slider-film.hbs';

const slider = new Glide('.glide', {
  type: 'slider',
  startAt: 0,
  perView: 8,
  autoplay: 3000,
  hoverpause: true,
  bound: true,
  breakpoints: {
    1024: {
      perView: 8,
    },
    600: {
      perView: 6,
    },
  },
});

slider.mount();

// возвращает массив  из 20 объектов фильмов
function renderTrendySliderMovies() {
  const url = refs.BASE_URL + 'trending/all/day?' + refs.API_KEY;
  return fetch(url)
    .then(response => response.json())
    .then(({ results }) => {
      return results;
    })
    .then(appendSliderMarkup)
    .catch(error => {});
}

console.log(renderTrendySliderMovies());

function appendSliderMarkup(results) {
  refs.slider.innerHTML = sliderCardTemplate(results);
}
