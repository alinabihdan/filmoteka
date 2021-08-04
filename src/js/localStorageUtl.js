import refs from './refs';
import filmoteka from './ApiService';
import listenStorageBtns from './modal-film';

class LocalStorageUtl {
  constructor() {
    this.filmsToWatched = 'filmsToWatched';
    this.filmsToQueue = 'filmsToQueue';
    this.cardsPerPage = 20;
    this.totalPages = 1;
    this.page = 1;
  }

  getFilmToWatched() {
    const filmLocalStorage = localStorage.getItem(this.filmsToWatched);
    if (filmLocalStorage !== null) {
      return JSON.parse(filmLocalStorage);
    }
    return [];
  }

  getFilmToQueue() {
    const filmLocalStorage = localStorage.getItem(this.filmsToQueue);
    if (filmLocalStorage !== null) {
      return JSON.parse(filmLocalStorage);
    }
    return [];
  }

  putFilmToWatched(el) {
    let filmsToWatched = this.getFilmToWatched();
    const index = filmsToWatched.findIndex(e => e.id === el.id);

    if (index === -1) {
      filmsToWatched.push(el);
    } else {
      filmsToWatched.splice(index, 1);
    }

    localStorage.setItem(this.filmsToWatched, JSON.stringify(filmsToWatched));
  }

  putFilmToQueue(el) {
    let filmsToQueue = this.getFilmToQueue();

    const index = filmsToQueue.findIndex(e => e.id === el.id);

    if (index === -1) {
      filmsToQueue.push(el);
    } else {
      filmsToQueue.splice(index, 1);
    }

    localStorage.setItem(this.filmsToQueue, JSON.stringify(filmsToQueue));
  }

  incrementPage() {
    this.page += 1;
  }

  decrementPage() {
    this.page -= 1;
  }

  setPage(newPage) {
    this.page = newPage;
  }

  resetPage() {
    this.page = 1;
  }

  setTotalPages(array) {
    this.totalPages = Math.ceil(array.length / this.cardsPerPage);
  }
}

const localStorageUtl = new LocalStorageUtl();

// localStorageUtl.putFilmToWatched('el1');
// localStorageUtl.putFilmToWatched('el2');
// localStorageUtl.putFilmToWatched('el23');

// localStorageUtl.putFilmToQueue('el2');
// localStorageUtl.putFilmToQueue('el5');

// refs.watchedBtn.addEventListener('click', localStorageUtl.putFilmToWatched);
// refs.queueBtn.addEventListener('click', localStorageUtl.putFilmToQueue);

export default localStorageUtl;
