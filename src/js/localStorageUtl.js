import refs from './refs';
import filmoteka from './ApiService';

class LocalStorageUtl {
  constructor() {
    this.filmsToWatched = 'filmsToWatched';
    this.filmsToQueue = 'filmsToQueue';
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

    if (filmsToWatched.some(e => e.id === el.id)) {
      return;
    } else {
      filmsToWatched.push(el);
    }
    localStorage.setItem(this.filmsToWatched, JSON.stringify(filmsToWatched));
  }

  putFilmToQueue(el) {
    let filmsToQueue = this.getFilmToQueue();

    if (filmsToQueue.some(e => e.id === el.id)) {
      return;
    } else {
      filmsToQueue.push(el);
    }

    localStorage.setItem(this.filmsToQueue, JSON.stringify(filmsToQueue));
  }
}

const localStorageUtl = new LocalStorageUtl();
export default localStorageUtl;
