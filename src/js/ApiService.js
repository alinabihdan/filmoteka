
import movieCardTpl from '../templates/main-gallery.hbs'
const refs = {
    movieContainer: document.querySelector('.movie-list'),
};
const API_KEY = 'api_key=05d7e6695d9ebeb510a995559544df94';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL+'/trending/movie/week?'+API_KEY;

getMovies(API_URL)
.then(data => {
    renderMovieCard(data.results);
    console.log(data.results);
})
.catch(error => console.log(error));

function getMovies(url) {
     return fetch(url).then(response => response.json());
}

function renderMovieCard (data) {
    const markup = movieCardTpl(data);
  console.log(markup);
  refs.movieContainer.innerHTML = markup;
}
