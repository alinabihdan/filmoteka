import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import refs from './refs';
import filmoteka from './ApiService';

function fetchTrailerFilm(id) {
    return filmoteka.getMovieByID
}