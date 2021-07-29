import { func } from 'assert-plus';
import { lowerFirst } from 'lodash';
import modalFilmTpl from '../templates/modal-film.hbs'
import refs from './refs';

refs.movieContainer.addEventListener('click', fetchAndRenderFilmCard);
refs.slider.addEventListener('click', fetchAndRenderFilmCard);

function  fetchAndRenderFilmCard (e) {
    if (e.target.nodeName === 'IMG') {
        renderFilmCard(e.target.dataset.id);
        refs.modalFilmBlackdrop.classList.add('is-active');
        refs.bodyEl.classList.add('modal-open');
    };
};

async function renderFilmCard (id) {
    try {
        const film = await fetchFilm(id);
        refs.modalFilmRenderField.innerHTML = modalFilmTpl(film);
    } catch {
        return alert("Soory somewhere there is a mistake");
    };
};

async function fetchFilm (id) {
    const response = await fetch(`${refs.BASE_URL}movie/${id}?${refs.API_KEY}&language=en-US`);
    
    if(!response.ok) {
        throw new Error(`Sorry, but something went wrong ${response.status}`);
    }

    const film = await response.json();
    return await film;
};
