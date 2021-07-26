import movieCardTpl from '../templates/main-gallery.hbs';
import refs from './refs';

const API_URL = refs.BASE_URL + 'trending/movie/week?' + refs.API_KEY;

getMovies(API_URL)
  .then(data => {
    renderMovieCard(data.results);
    console.log(data.results);
  })
  .catch(error => console.log(error));

function getMovies(url) {
  return fetch(url).then(response => response.json());
}

function renderMovieCard(data) {
  const markup = movieCardTpl(data);
  console.log(markup);
  refs.movieContainer.innerHTML = markup;
}
