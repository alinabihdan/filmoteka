import { func } from 'assert-plus';
import { lowerFirst } from 'lodash';
import modalFilmTpl from '../templates/modal-film.hbs'

const BASE_URL = 'https://api.themoviedb.org/3/movie/';  
const API_KEY = '05d7e6695d9ebeb510a995559544df94';

const modalFilmBlackdrop = document.querySelector('.film-blackdrop');
const modalAppearBtn = document.querySelector('.modal-btn-appear');
// console.log(modalAppearBtn);
modalAppearBtn.addEventListener('click', modalFilmAppear);

function modalFilmAppear() {
    
    // console.log('click');
    modalFilmBlackdrop.classList.add('is-active');
    const closeModalBtn = document.querySelector('[data-modal="close"]');
    closeModalBtn.addEventListener('click', closeFilmBackDrop);
};

function closeFilmBackDrop () {
    modalFilmBlackdrop.classList.remove('is-active');
}

const modalFilmField = document.querySelector('#film-template');
renderFilmCard();
fetchFilm(617502);
// 497698

async function fetchFilm (id) {
    const response = await fetch(`${BASE_URL}${id}?api_key=${API_KEY}&language=en-US`);
    // const response = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`);
    
    if(!response.ok) {
        throw new Error(`Sorry, but something went wrong ${response.status}`);
    }

    const film = await response.json();
    // console.log(film);
    return await film;
};

async function renderFilmCard () {
    try {
        const film = await fetchFilm(497698);
        // console.log(modalFilmTpl(film));
        modalFilmField.insertAdjacentHTML('beforeend', modalFilmTpl(film));
    } catch {
        return alert("Soory somewhere there is a mistake");
    };
}; 
