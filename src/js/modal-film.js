import modalFilmTpl from '../templates/modal-film.hbs';
import galleryTpl from '../templates/watched-and-queue.hbs';
import watchedWhenNoneTpl from '../templates/watched-list.hbs';
import queueWhenNoneTpl from '../templates/queue-list.hbs';
import { onHomeButtonClick } from './library';
import refs from './refs';
import filmoteka from './ApiService';
import { fetchTrailerFilm } from './trailers';
import { closeModal, overlayClick } from './btn-to-close';
import { renderPopularMovies, verificationAddToWatchedButtons, verificationAddToQueueButtons } from './movies-gallery';

if (!localStorage.filmsToWatched || localStorage.filmsToWatched === null) {
    localStorage.setItem('filmsToWatched', '[]');
    localStorage.setItem('filmsToQueue', '[]');
}

refs.movieContainer.addEventListener('click', fetchAndRenderFilmCard);
refs.slider.addEventListener('click', fetchAndRenderFilmCard);
refs.watchedList.addEventListener('click', fetchAndRenderFilmCard);
refs.queueList.addEventListener('click', fetchAndRenderFilmCard);

async function fetchAndRenderFilmCard(e) {
    if (e.target.id === 'open-modal-film-btn' || e.target.nodeName === 'IMG') {
        await renderFilmCard(e.target.dataset.id);
        refs.modalFilmBlackdrop.classList.add('is-active');
        refs.filmModalField.classList.add('is-active');
        refs.bodyEl.classList.add('modal-open');
        refs.buttonToTop.classList.add('visually-hidden');

    listenStorageBtns();
    } else if (e.target.id === 'overlay-btn-add-to-watched') {
      const addToWatchedBtn = e.target;
      const id = e.target.dataset.id;
      await filmoteka.getMovieByID(id);
      const film = filmoteka.storageData;
      onModalWatchedButtonClick(film, addToWatchedBtn);
  } else if (e.target.id === 'overlay-btn-add-to-queue') {
      const addToQueueBtn = e.target;
      const id = e.target.dataset.id;
      await filmoteka.getMovieByID(id);
      const film = filmoteka.storageData;
      onModalQueueButtonClick(film, addToQueueBtn);
  }
    return
}

async function renderFilmCard(id) {
    try {
        const film = await filmoteka.getMovieByID(id);
        refs.modalFilmRenderField.innerHTML = modalFilmTpl(film);
        refs.modalFilmBlackdrop.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${film.backdrop_path})`;
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
    const traillerBtn = document.getElementById('tailler-btn');



    isInLocalStorage(queueFilmes, film, queueBtn, 'queue');
    isInLocalStorage(watchedFilmes, film, watchedBtn, 'watched');

    queueBtn.addEventListener('click', () => onModalQueueButtonClick(film, queueBtn));
    watchedBtn.addEventListener('click', () => onModalWatchedButtonClick(film, watchedBtn));
    traillerBtn.addEventListener('click', hadleClickTrailer);
};

function hadleClickTrailer(e) {
  const id = e.target.dataset.id;
   fetchTrailerFilm(id);
}

async function onModalQueueButtonClick(film, button) {
    const filmes = JSON.parse(localStorage.filmsToQueue);
    const index = filmes.findIndex(movie => film.id === movie.id);
    if (index === -1) {
        filmes.push(film);
        localStorage.filmsToQueue = JSON.stringify(filmes);
        button.textContent = "delete from queue";
        swal("ADD TO QUEUE", "", "success", { button: false, timer: 1000, });
        renderQueueList();
        renderPopularMovies();
    } else {
        filmes.splice(index, 1);
        localStorage.filmsToQueue = JSON.stringify(filmes);
        button.textContent = "add to queue";
        swal("DELETE FROM QUEUE", "", "success", { button: false, timer: 1000, });
        renderQueueList();
        renderPopularMovies();
    }
}

async function onModalWatchedButtonClick(film, button) {
    const filmes = JSON.parse(localStorage.filmsToWatched);
    const index = filmes.findIndex(movie => film.id === movie.id);
    if (index === -1) {
        filmes.push(film);
        localStorage.filmsToWatched = JSON.stringify(filmes);
        button.textContent = "delete from watched";
        swal("ADD TO WATCHED", "", "success", { button: false, timer: 1000, });
        renderWatchedList();
        renderPopularMovies();
    } else {
        filmes.splice(index, 1);
        localStorage.filmsToWatched = JSON.stringify(filmes);
        button.textContent = "add to watched";
        swal("DELETE FROM WATCHED", "", "success", { button: false, timer: 1000, });
        renderWatchedList();
        renderPopularMovies();
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

async function renderQueueList() {
  const filmes = JSON.parse(localStorage.getItem('filmsToQueue'));
  filmes.map(film => {
    film.release_date = film.release_date.slice(0, 4);
  });
  filmes.map(film => {
    const genresList = film.genres.map(genre => genre.name);
    film.genres = genresList.join(', ');
  });

  if (filmes.length === 0) {
    refs.queueContainer.classList.replace('movie-list', 'queue-list');
      
    refs.queueContainer.innerHTML = '';
    refs.queueContainer.insertAdjacentHTML('beforeend', queueWhenNoneTpl());
      
    const backToSearchBtn = document.getElementById('back-to-search-btn');
    backToSearchBtn.addEventListener('click', onHomeButtonClick);
      
    refs.queueList.removeEventListener('click', fetchAndRenderFilmCard);

  } else {
    refs.queueContainer.classList.replace('queue-list', 'movie-list');

    refs.queueContainer.innerHTML = '';
    refs.queueContainer.insertAdjacentHTML('beforeend', galleryTpl(filmes));
    
    refs.watchedList.addEventListener('click', fetchAndRenderFilmCard);
    refs.queueList.addEventListener('click', fetchAndRenderFilmCard);
    verificationAddToWatchedButtons();
    verificationAddToQueueButtons();
  }
}

async function renderWatchedList() {
  const filmes = JSON.parse(localStorage.getItem('filmsToWatched'));
  filmes.map(film => {
    film.release_date = film.release_date.slice(0, 4);
  });
  filmes.map(film => {
    const genresList = film.genres.map(genre => genre.name);
    film.genres = genresList.join(', ');
  });

  if (filmes.length === 0) {
    refs.watchedContainer.classList.replace('movie-list', 'watched-list');
    
    refs.watchedContainer.innerHTML = '';
    refs.watchedContainer.insertAdjacentHTML('beforeend', watchedWhenNoneTpl());
    
    const backToHomeBtn = document.getElementById('back-to-home-btn');
    backToHomeBtn.addEventListener('click', onHomeButtonClick);
      
    refs.watchedList.removeEventListener('click', fetchAndRenderFilmCard);
  
  } else {
    refs.watchedContainer.classList.replace('watched-list', 'movie-list');

    refs.watchedContainer.innerHTML = '';
    refs.watchedContainer.insertAdjacentHTML('beforeend', galleryTpl(filmes));
    
    verificationAddToWatchedButtons();
    verificationAddToQueueButtons();
    refs.queueList.addEventListener('click', fetchAndRenderFilmCard);
    refs.watchedList.addEventListener('click', fetchAndRenderFilmCard);
  }
}

export { listenStorageBtns, fetchAndRenderFilmCard, }