import modalFilmTpl from '../templates/modal-film.hbs';
import refs from './refs';
import filmoteka from './ApiService';
import localStorageUtl from './localStorageUtl';

if (!localStorage.filmsToWatched || localStorage.filmsToWatched === null) {
    localStorage.setItem('filmsToWatched', '[]');
    localStorage.setItem('filmsToQueue', '[]');
}

refs.movieContainer.addEventListener('click', fetchAndRenderFilmCard);
refs.slider.addEventListener('click', fetchAndRenderFilmCard);
refs.watchedList.addEventListener('click', fetchAndRenderFilmCard);
refs.watchedList.addEventListener('click', fetchAndRenderFilmCard);

async function fetchAndRenderFilmCard(e) {
    if (e.target.nodeName === 'IMG') {
        await renderFilmCard(e.target.dataset.id);
        refs.modalFilmBlackdrop.classList.add('is-active');
        refs.filmModalField.classList.add('is-active');
        refs.bodyEl.classList.add('modal-open');
        refs.buttonToTop.classList.add('visually-hidden');

    listenStorageBtns();
  }
}

async function renderFilmCard(id) {
    try {
        const film = await filmoteka.getMovieByID(id);
        refs.modalFilmRenderField.innerHTML = modalFilmTpl(film);
        console.log(filmoteka.storageData);
    } catch {
        return alert('Sorry there is a mistake');
    }
};

function listenStorageBtns() {
    const queueBtn = document.querySelector('.btn-add-to-queue');
    const watchedBtn = document.querySelector('.btn-add-to-watched');

    queueBtn.addEventListener('click', () => {
        const movie = filmoteka.storageData;
        const id = filmoteka.storageData.id;
        const filmes = JSON.parse(localStorage.filmsToQueue);
        const index = filmes.findIndex(film => id === film.id);
        if (index === -1) {
            filmes.push(movie);
            console.log(filmes);
            localStorage.filmsToQueue = JSON.stringify(filmes);
            queueBtn.textContent = "delete from queue";
        } else {
            filmes.splice(index, 1);
            localStorage.filmsToQueue = JSON.stringify(filmes);
            queueBtn.textContent = "add to queue";
        }
    });
    watchedBtn.addEventListener('click', () => {
        const movie = filmoteka.storageData;
        const id = filmoteka.storageData.id;
        const filmes = JSON.parse(localStorage.filmsToWatched);
        const index = filmes.findIndex(film => id === film.id);
        if (index === -1) {
            filmes.push(movie);
            console.log(filmes);
            localStorage.filmsToWatched = JSON.stringify(filmes);
            watchedBtn.textContent = "delete from watched";
        } else {
            filmes.splice(index, 1);
            localStorage.filmsToWatched = JSON.stringify(filmes);
            watchedBtn.textContent = "add to watched";
        }
    });

};

export { listenStorageBtns }