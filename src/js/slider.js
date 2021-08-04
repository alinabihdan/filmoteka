import Glide from '@glidejs/glide';
import refs from './refs';
import filmoteka from './ApiService';
import sliderCardTemplate from '../templates/slider-film.hbs';

const slider = new Glide('.glide', {
  type: 'slider',
  startAt: 0,
  perView: 8,
  gap: 30,
  autoplay: 3000,
  hoverpause: true,
  bound: true,
  // peek: 107,
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

filmoteka
  .renderTrendySliderMovies()
  .then(appendSliderMarkup)
  .catch(error => {
    console.error();
  });

function appendSliderMarkup(results) {
  refs.slider.innerHTML = sliderCardTemplate(results);
}
