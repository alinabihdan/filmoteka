import { func } from 'assert-plus';
import { lowerFirst } from 'lodash';
import modalFilmTpl from '../templates/modal-film.hbs'

const BASE_URL = 'https://api.themoviedb.org/3/movie/';  
const API_KEY = '05d7e6695d9ebeb510a995559544df94';

const refs = {
    movieContainer: document.querySelector('.movie-list'),
    modalFilmBlackdrop: document.querySelector('.film-blackdrop'),
    modalFilmField: document.querySelector('#film-template'),
    closeModalFilmBtn: document.querySelector('[data-modal="close"]'),
};

refs.movieContainer.addEventListener('click', fetchAndRenderFilmCard);

function  fetchAndRenderFilmCard (e) {
    if (e.target.nodeName === 'IMG') {
        renderFilmCard(e.target.dataset.id);
        refs.modalFilmBlackdrop.classList.add('is-active');
        
        refs.closeModalFilmBtn.addEventListener('click', onCloseModalFilmBtn);
        refs.modalFilmBlackdrop.addEventListener('click', onOverlayClick);
        document.addEventListener('keydown', onEscCloseFilmBlackdrop);
    };
};

function onCloseModalFilmBtn () {
    refs.modalFilmBlackdrop.classList.remove('is-active');
};

function onOverlayClick (e) {
    console.log(e.target.classList.contains('film-blackdrop'));
    if (e.target.classList.contains('film-blackdrop')) {
        refs.modalFilmBlackdrop.classList.remove('is-active');
    };
};

async function renderFilmCard (id) {
    try {
        const film = await fetchFilm(id);
        refs.modalFilmField.innerHTML = modalFilmTpl(film);
    } catch {
        return alert("Soory somewhere there is a mistake");
    };
};

async function fetchFilm (id) {
    const response = await fetch(`${BASE_URL}${id}?api_key=${API_KEY}&language=en-US`);
    
    if(!response.ok) {
        throw new Error(`Sorry, but something went wrong ${response.status}`);
    }

    const film = await response.json();
    return await film;
};

function onEscCloseFilmBlackdrop (e) {
    if (e.key === 'Escape') {
        refs.modalFilmBlackdrop.classList.remove('is-active');
    };
};
