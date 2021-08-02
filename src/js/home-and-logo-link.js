import refs from './refs';
import filmoteka from './ApiService';
import { renderPopularMovies } from './movies-gallery';

refs.homeButton.addEventListener('click', onHomeAndLogoBtnClick);
refs.logoLink.addEventListener('click', onHomeAndLogoBtnClick);

async function onHomeAndLogoBtnClick() {
  filmoteka.resetPage();
  await refs.sectionGenres.classList.remove('visually-hidden');
  renderPopularMovies();
};

