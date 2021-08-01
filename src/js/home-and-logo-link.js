import refs from './refs';
import filmoteka from './ApiService';
import { renderPopularMovies } from './movies-gallery';

refs.homeButton.addEventListener('click', onHomeAndLogoBtnClick);
refs.logoLink.addEventListener('click', onHomeAndLogoBtnClick);

function onHomeAndLogoBtnClick() {
  filmoteka.resetPage();
  renderPopularMovies();
};
