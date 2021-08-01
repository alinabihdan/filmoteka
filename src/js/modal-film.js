import modalFilmTpl from '../templates/modal-film.hbs';
import refs from './refs';
import filmoteka from './ApiService';
import localStorageUtl from './localStorageUtl';

refs.movieContainer.addEventListener('click', fetchAndRenderFilmCard);
refs.slider.addEventListener('click', fetchAndRenderFilmCard);

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
}

function listenStorageBtns() {
  const queueBtn = document.querySelector('.btn-add-to-queue');
  const watchedBtn = document.querySelector('.btn-add-to-watched');

<<<<<<< Updated upstream
  watchedBtn.addEventListener('click', () =>
    localStorageUtl.putFilmToWatched(filmoteka.storageData),
  );
  queueBtn.addEventListener('click', () => localStorageUtl.putFilmToQueue(filmoteka.storageData));
=======
  queueBtn.addEventListener('click', () => console.log(filmoteka.storageData));
  watchedBtn.addEventListener('click', () => console.log(filmoteka.storageData));
>>>>>>> Stashed changes
}

export { listenStorageBtns };
