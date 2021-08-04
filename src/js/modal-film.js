import modalFilmTpl from '../templates/modal-film.hbs';
import galleryTpl from '../templates/watched-and-queue.hbs';
import watchedWhenNoneTpl from '../templates/watched-list.hbs';
import queueWhenNoneTpl from '../templates/queue-list.hbs';
import { onHomeButtonClick } from './library';
import refs from './refs';
import filmoteka from './ApiService';
import { closeModal, overlayClick } from './btn-to-close';

if (!localStorage.filmsToWatched || localStorage.filmsToWatched === null) {
    localStorage.setItem('filmsToWatched', '[]');
    localStorage.setItem('filmsToQueue', '[]');
}

refs.movieContainer.addEventListener('click', fetchAndRenderFilmCard);
refs.slider.addEventListener('click', fetchAndRenderFilmCard);
refs.watchedList.addEventListener('click', fetchAndRenderFilmCard);
refs.queueList.addEventListener('click', fetchAndRenderFilmCard);

async function fetchAndRenderFilmCard(e) {
    if (e.target.id === 'open-modal-film-btn') {
        await renderFilmCard(e.target.dataset.id);
        refs.closeBtn.addEventListener('click', closeModal);
        refs.modalWindow.addEventListener('click', overlayClick);
        refs.modalFilmBlackdrop.classList.add('is-active');
        refs.filmModalField.classList.add('is-active');
        refs.bodyEl.classList.add('modal-open');
        refs.buttonToTop.classList.add('visually-hidden');

    listenStorageBtns();
  }
    return
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

    queueBtn.addEventListener('click', () => onModalQueueButtonClick(film, queueBtn));
    watchedBtn.addEventListener('click', () => onModalWatchedButtonClick(film, watchedBtn));

};

function onModalQueueButtonClick(film, button) {
    const filmes = JSON.parse(localStorage.filmsToQueue);
    const index = filmes.findIndex(movie => film.id === movie.id);
    if (index === -1) {
        filmes.push(film);
        console.log(filmes);
        localStorage.filmsToQueue = JSON.stringify(filmes);
        button.textContent = "delete from queue";
        swal("ADD TO QUEUE", "", "success", { button: false, timer: 1000, });
        renderQueueList();
    } else {
        filmes.splice(index, 1);
        localStorage.filmsToQueue = JSON.stringify(filmes);
        button.textContent = "add to queue";
        swal("DELETE FROM QUEUE", "", "success", { button: false, timer: 1000, });
        renderQueueList();
    }
}

function onModalWatchedButtonClick(film, button) {
    const filmes = JSON.parse(localStorage.filmsToWatched);
    const index = filmes.findIndex(movie => film.id === movie.id);
    if (index === -1) {
        filmes.push(film);
        console.log(filmes);
        localStorage.filmsToWatched = JSON.stringify(filmes);
        button.textContent = "delete from watched";
        swal("ADD TO WATCHED", "", "success", { button: false, timer: 1000, });
        renderWatchedList();
    } else {
        filmes.splice(index, 1);
        localStorage.filmsToWatched = JSON.stringify(filmes);
        button.textContent = "add to watched";
        swal("DELETE FROM WATCHED", "", "success", { button: false, timer: 1000, });
        renderWatchedList();
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

function renderQueueList() {
  const filmes = JSON.parse(localStorage.getItem('filmsToQueue'));
  console.log(filmes);
  filmes.map(film => {
    film.release_date = film.release_date.slice(0, 4);
  });
  filmes.map(film => {
    const genresList = film.genres.map(genre => genre.name);
    console.log(genresList);
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
    
    refs.watchedList.removeEventListener('click', fetchAndRenderFilmCard);
    refs.queueList.addEventListener('click', fetchAndRenderFilmCard);
  }
}

function renderWatchedList() {
  const filmes = JSON.parse(localStorage.getItem('filmsToWatched'));
  console.log(filmes);
  filmes.map(film => {
    film.release_date = film.release_date.slice(0, 4);
  });
  filmes.map(film => {
    const genresList = film.genres.map(genre => genre.name);
    console.log(genresList);
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
    
    refs.queueList.addEventListener('click', fetchAndRenderFilmCard);
    refs.watchedList.addEventListener('click', fetchAndRenderFilmCard);
  }
}

export { listenStorageBtns, fetchAndRenderFilmCard, }