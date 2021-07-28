import refs from './refs';

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

  putFilmToWatched(id) {
    let filmsToWatched = this.getFilmToWatched();

    const index = filmsToWatched.indexOf(id);

    if (index === -1) {
      filmsToWatched.push(id);
    } else {
      filmsToWatched.splice(index, 1);
    }

    localStorage.setItem(this.filmsToWatched, JSON.stringify(filmsToWatched));
  }

  putFilmToQueue(id) {
    let filmsToQueue = this.getFilmToQueue();
    const index = filmsToQueue.indexOf(id);

    if (index === -1) {
      filmsToQueue.push(id);
    } else {
      filmsToQueue.splice(index, 1);
    }

    localStorage.setItem(this.filmsToQueue, JSON.stringify(filmsToQueue));
  }

  onclick() {
    console.log(6);
  }
}

const localStorageUtl = new LocalStorageUtl();

localStorageUtl.putFilmToWatched('el1');
localStorageUtl.putFilmToWatched('el2');
localStorageUtl.putFilmToWatched('el23');

localStorageUtl.putFilmToQueue('el2');
localStorageUtl.putFilmToQueue('el5');

// refs.watchedBtn.addEventListener('click', localStorageUtl.putFilmToWatched);
// refs.queueBtn.addEventListener('click', localStorageUtl.putFilmToQueue);
