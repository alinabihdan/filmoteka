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
refs.queueList.addEventListener('click', fetchAndRenderFilmCard);

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
    const film = filmoteka.storageData;
    const queueFilmes = JSON.parse(localStorage.filmsToQueue);
    const watchedFilmes = JSON.parse(localStorage.filmsToWatched);


    isInLocalStorage(queueFilmes, film, queueBtn, 'queue');
    isInLocalStorage(watchedFilmes, film, watchedBtn, 'watched');

    queueBtn.addEventListener('click', () => onQueueButtonClick(film, queueBtn));
    watchedBtn.addEventListener('click', () => onWatchedButtonClick(film, watchedBtn));

};

function onQueueButtonClick(film, button) {
    const filmes = JSON.parse(localStorage.filmsToQueue);
    const index = filmes.findIndex(movie => film.id === movie.id);
    if (index === -1) {
        filmes.push(film);
        console.log(filmes);
        localStorage.filmsToQueue = JSON.stringify(filmes);
        button.textContent = "delete from queue";
        swal("ADD TO QUEUE", "", "success", {button: false, timer: 1000,});
    } else {
        filmes.splice(index, 1);
        localStorage.filmsToQueue = JSON.stringify(filmes);
        button.textContent = "add to queue";
        swal("DELETE FROM QUEUE", "", "success", {button: false, timer: 1000,});

    }
}

function onWatchedButtonClick(film, button) {
    const filmes = JSON.parse(localStorage.filmsToWatched);
    const index = filmes.findIndex(movie => film.id === movie.id);
    if (index === -1) {
        filmes.push(film);
        console.log(filmes);
        localStorage.filmsToWatched = JSON.stringify(filmes);
        button.textContent = "delete from watched";
        swal("ADD TO WATCHED", "", "success", {button: false, timer: 1000,});
    } else {
        filmes.splice(index, 1);
        localStorage.filmsToWatched = JSON.stringify(filmes);
        button.textContent = "add to watched";
        swal("DELETE FROM WATCHED", "", "success", {button: false, timer: 1000,});
    }
}

function isInLocalStorage(filmes, film, button, list) {
    const index = filmes.findIndex(movie => film.id === movie.id);
    if (index !== -1) {
        button.textContent = `delete from ${list}`;
    } else {
        return
    }
    }

export { listenStorageBtns, fetchAndRenderFilmCard }