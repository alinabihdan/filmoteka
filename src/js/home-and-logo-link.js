import refs from './refs';
import filmApiService from './ApiService';
import {renderPopularMovie} from './movies-gallery';

refs.homeButton.addEventListener('click', onHomeAndLogoBtnClick);
refs.logoLink.addEventListener('click', onHomeAndLogoBtnClick);

function onHomeAndLogoBtnClick () {
    filmApiService.resetPage();
    filmApiService.getAllMovies()
    .then(renderPopularMovie)
    .catch(error => {
    console.log(error);
    });
};


