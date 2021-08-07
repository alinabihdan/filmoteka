import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import refs from './refs';
import filmoteka from './ApiService';
import { Loader } from '../js/loader';

const loader = new Loader();

const API_KEY = 'api_key=05d7e6695d9ebeb510a995559544df94';
const BASE_URL = 'https://api.themoviedb.org/3';

function fetchTrailerFilm(id) {
    loader.openLoader();
    return fetch(`${BASE_URL}/movie/${id}/videos?${API_KEY}`)
    .then(response => response.json())
    .then(videos => {
      const video = videos.results.find(result => result.type === "Trailer" && result.name.includes('Trailer'));
      const trailerKey = video.key;
      const trailer = basicLightbox.create(`
  <iframe width="75%" height="75%" src='https://www.youtube.com/embed/${trailerKey}'frameborder="0" allowfullscreen class="trailer_video"></iframe>
`);
      trailer.show();
    })
    .catch(error => {
      const noTrailer = basicLightbox.create(`
  <img width="75%" height="75%" src="https://hsto.org/webt/un/y2/nu/uny2nux8h1_fmgig2g-odesccse.jpeg" alt="no found trailer" class="trailer_video">
`);
      //<img width="450" height="320" src="https://hsto.org/webt/un/y2/nu/uny2nux8h1_fmgig2g-odesccse.jpeg" alt="no found trailer" class="trailer_video">
      noTrailer.show();
    }).finally(loader.closeLoader());
}

export { fetchTrailerFilm }