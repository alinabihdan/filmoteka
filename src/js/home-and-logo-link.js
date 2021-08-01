import refs from './refs';
import filmoteka from './ApiService';
import { renderPopularMovie } from './movies-gallery';

refs.homeButton.addEventListener('click', onHomeAndLogoBtnClick);
refs.logoLink.addEventListener('click', onHomeAndLogoBtnClick);

function onHomeAndLogoBtnClick() {
  filmoteka.resetPage();
  filmoteka
    .getAllMovies()
    .then(renderPopularMovie)
    .catch(error => {
      console.log(error);
    });
}
