import modalFilmTpl from '../templates/modal-film.hbs'
import refs from './refs';
import filmoteka from './ApiService';

refs.movieContainer.addEventListener('click', fetchAndRenderFilmCard);
refs.slider.addEventListener('click', fetchAndRenderFilmCard);

async function fetchAndRenderFilmCard (e) {
    if (e.target.nodeName === 'IMG') {
        await renderFilmCard(e.target.dataset.id);
        refs.modalFilmBlackdrop.classList.add('is-active');
        refs.filmModalField.classList.add('is-active');
        refs.bodyEl.classList.add('modal-open');

        listenStorageBtns();
    };
};

async function renderFilmCard (id) {
    try{
    const film = await filmoteka.getMovieByID(id);
    refs.modalFilmRenderField.innerHTML = modalFilmTpl(film);
    console.log(filmoteka.storageData);
    } catch {
        return alert ('Sorry there is a mistake');
    }
};

function listenStorageBtns () {
    const queueBtn = document.querySelector('.btn-add-to-queue');
    const watchedBtn = document.querySelector('.btn-add-to-watched');

    queueBtn.addEventListener('click', () => console.log(filmoteka.storageData));
    watchedBtn.addEventListener('click', () => console.log(filmoteka.storageData));
}; 

export {listenStorageBtns}
