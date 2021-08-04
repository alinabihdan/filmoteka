import refs from './refs';
import galleryTpl from '../templates/watched-and-queue.hbs';
import watchedWhenNoneTpl from '../templates/watched-list.hbs';
import queueWhenNoneTpl from '../templates/queue-list.hbs';
import filmoteka from './ApiService';
import renderPopularMovie from './movies-gallery';
import swal from 'sweetalert';
import localStorageUtl from './localStorageUtl';
import { startLocalPagination } from './pagination';
import { fetchAndRenderFilmCard } from './modal-film';

function addListenerToLibraryBtn() {
  refs.libraryButton.addEventListener('click', onLibraryButtonClick);
}

function onLibraryButtonClick() {
  refs.homeButton.addEventListener('click', onHomeButtonClick);
  refs.logoLink.addEventListener('click', onHomeButtonClick);
  refs.queueButton.addEventListener('click', onQueueButtonClick);
  refs.header.classList.replace('home-header', 'my-library-header');
  refs.homeButton.classList.remove('current');
  refs.libraryButton.classList.add('current');
  refs.searchForm.classList.add('visually-hidden');
  refs.watchedButton.classList.remove('visually-hidden');
  refs.queueButton.classList.remove('visually-hidden');
  refs.sliderSection.classList.add('visually-hidden');
  refs.sectionGenres.classList.add('visually-hidden');
  refs.movieContainer.classList.add('visually-hidden');
  // refs.paginationContainer.classList.add('visually-hidden');
  refs.watchedContainer.classList.remove('visually-hidden');

  localStorageUtl.resetPage();
  refs.watchedContainer.classList.replace('watched-list', 'movie-list');
  renderWatchedList(); //функция которая рендерит список просмотренных фильмов

  if (sessionStorage.libraryNotification !== 'showed') {
    const libraryTitle = 'Это Твоя библиотека';
    const libraryMessage =
      "Тут будут хранится фильмы, которые ты добавил(ла) в списки. По умолчанию список 'Уже смотрел(ла)'. При клике на 'QUEUE' переходишь в список 'Хочу смотреть'. Развлекайся!";
    swal(libraryTitle, libraryMessage);
    sessionStorage.setItem('libraryNotification', 'showed');
  }
}

export function onHomeButtonClick() {
  refs.header.classList.replace('my-library-header', 'home-header');
  refs.libraryButton.classList.remove('current');
  refs.homeButton.classList.add('current');
  refs.searchForm.classList.remove('visually-hidden');
  refs.watchedButton.classList.add('visually-hidden');
  refs.watchedButton.classList.add('is-btn-active');
  refs.queueButton.classList.add('visually-hidden');
  refs.queueButton.classList.remove('is-btn-active');
  refs.watchedButton.removeEventListener('click', onWatchedButtonClick);
  refs.queueButton.removeEventListener('click', onQueueButtonClick);
  refs.logoLink.removeEventListener('click', onHomeButtonClick);
  refs.sliderSection.classList.remove('visually-hidden');
  refs.sectionGenres.classList.remove('visually-hidden');
  refs.movieContainer.classList.remove('visually-hidden');
  refs.watchedContainer.classList.add('visually-hidden');
  refs.queueContainer.classList.add('visually-hidden');
  // refs.paginationContainer.classList.remove('visually-hidden');
  refs.watchedContainer.classList.replace('movie-list', 'watched-list');
  refs.queueContainer.classList.replace('movie-list', 'queue-list');
  renderMoviesGallery();
  refs.watchedList.removeEventListener('click', fetchAndRenderFilmCard);
  refs.queueList.removeEventListener('click', fetchAndRenderFilmCard);
}

function onQueueButtonClick() {
  refs.watchedContainer.classList.replace('movie-list', 'watched-list');
  refs.watchedContainer.classList.add('visually-hidden');
  refs.queueContainer.classList.replace('queue-list', 'movie-list');
  refs.watchedButton.addEventListener('click', onWatchedButtonClick);
  refs.queueButton.removeEventListener('click', onQueueButtonClick);
  refs.watchedButton.classList.remove('is-btn-active');
  refs.queueButton.classList.add('is-btn-active');

  localStorageUtl.resetPage();
  renderQueueList(); //функция которая рендерит список фильмов "Хочу смотреть"
}

function onWatchedButtonClick() {
  refs.queueContainer.classList.replace('movie-list', 'queue-list');
  refs.queueContainer.classList.add('visually-hidden');
  refs.watchedContainer.classList.replace('watched-list', 'movie-list');
  refs.queueButton.addEventListener('click', onQueueButtonClick);
  refs.watchedButton.removeEventListener('click', onWatchedButtonClick);
  refs.queueButton.classList.remove('is-btn-active');
  refs.watchedButton.classList.add('is-btn-active');

  localStorageUtl.resetPage();
  renderWatchedList();
}

async function renderWatchedList() {
  const filmes = await JSON.parse(localStorage.getItem('filmsToWatched'));
  const paginatedFilmes = paginateArray(filmes, localStorageUtl.page, localStorageUtl.cardsPerPage);

  // console.log(filmes);
  // console.log(paginatedFilmes);

  filmes.map(film => {
    film.release_date = film.release_date.slice(0, 4);
  });
  filmes.map(film => {
    const genresList = film.genres.map(genre => genre.name);
    // console.log(genresList);
    film.genres = genresList.join(', ');
  });

  if (filmes.length === 0) {
    refs.watchedList.removeEventListener('click', fetchAndRenderFilmCard);
    refs.queueList.addEventListener('click', fetchAndRenderFilmCard);
    refs.watchedContainer.classList.remove('visually-hidden');
    refs.watchedContainer.innerHTML = '';

    refs.watchedContainer.insertAdjacentHTML('beforeend', watchedWhenNoneTpl());
    const backToHomeBtn = document.getElementById('back-to-home-btn');
    backToHomeBtn.addEventListener('click', onHomeButtonClick);
    refs.watchedContainer.classList.replace('movie-list', 'watched-list');
    //    swal('Ей, так не годится', 'Дружище, посмотри уже на конец что-нибудь', 'warning');
  } else {
    refs.watchedContainer.classList.replace('watched-list', 'movie-list');
    refs.watchedContainer.classList.remove('visually-hidden');

    refs.watchedContainer.innerHTML = '';
    refs.watchedContainer.insertAdjacentHTML('beforeend', galleryTpl(paginatedFilmes));
    refs.watchedList.addEventListener('click', fetchAndRenderFilmCard);

    localStorageUtl.setTotalPages(filmes);
    startLocalPagination(renderWatchedList);
  }
  // тут будет функция которая будет рендерить галерею фильмов из сохраненных в соответственном массиве в LocalStorage
}

async function renderQueueList() {
  const filmes = await JSON.parse(localStorage.getItem('filmsToQueue'));
  const paginatedFilmes = paginateArray(filmes, localStorageUtl.page, localStorageUtl.cardsPerPage);

  console.log(filmes);
  console.log(paginatedFilmes);

  filmes.map(film => {
    film.release_date = film.release_date.slice(0, 4);
  });
  filmes.map(film => {
    const genresList = film.genres.map(genre => genre.name);
    // console.log(genresList);
    film.genres = genresList.join(', ');
  });

  if (filmes.length === 0) {
    refs.queueList.removeEventListener('click', fetchAndRenderFilmCard);
    refs.watchedList.addEventListener('click', fetchAndRenderFilmCard);
    refs.queueContainer.classList.remove('visually-hidden');
    refs.queueContainer.innerHTML = '';

    refs.queueContainer.insertAdjacentHTML('beforeend', queueWhenNoneTpl());
    const backToSearchBtn = document.getElementById('back-to-search-btn');
    backToSearchBtn.addEventListener('click', onHomeButtonClick);
    refs.queueContainer.classList.replace('movie-list', 'queue-list');
    //    swal('Ей, так не годится', 'Дружище, выбери уже на конец что-нибудь', 'warning');
  } else {
    refs.queueContainer.classList.replace('queue-list', 'movie-list');
    refs.queueContainer.classList.remove('visually-hidden');

    refs.queueContainer.innerHTML = '';
    refs.queueContainer.insertAdjacentHTML('beforeend', galleryTpl(paginatedFilmes));
    refs.queueList.addEventListener('click', fetchAndRenderFilmCard);

    localStorageUtl.setTotalPages(filmes);
    startLocalPagination(renderQueueList);
  }
  // тут будет функция которая будет рендерить галерею фильмов из сохраненных в соответственном массиве в LocalStorage
}

function renderMoviesGallery() {
  filmoteka.resetPage();
  filmoteka
    .getAllMovies()
    .then(renderPopularMovie)
    .catch(error => {
      console.log(error);
    });
}

function paginateArray(array, page, cardsPerPage) {
  page--;
  let start = page * cardsPerPage;
  let end = start + cardsPerPage;
  return array.slice(start, end);
}

addListenerToLibraryBtn();

export { renderQueueList, renderWatchedList };
