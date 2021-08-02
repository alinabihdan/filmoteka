import refs from './refs';
import galleryTpl from '../templates/watched-and-queue.hbs';
import filmoteka from './ApiService';
import renderPopularMovie from './movies-gallery';
import swal from 'sweetalert';
function addListenerToLibraryBtn() { // вешает слушатели на кнопки "Home" и "Library"
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
    refs.paginationContainer.classList.add('visually-hidden');
    refs.watchedContainer.classList.remove('visually-hidden');
    renderWatchedList(); //функция которая рендерит список просмотренных фильмов

  if (sessionStorage.libraryNotification !== 'showed') {
    const libraryTitle = "Это Твоя библиотека";
    const libraryMessage = "Тут будут хранится фильмы, которые ты добавил(ла) в списки. По умолчанию список 'Уже смотрел(ла)'. При клике на 'QUEUE' переходишь в список 'Хочу смотреть'. Развлекайся!";
    swal(libraryTitle, libraryMessage,);
    sessionStorage.setItem('libraryNotification', 'showed');
  } 
}

function onHomeButtonClick() {
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
    refs.backToHomeBtn.removeEventListener('click', onHomeButtonClick);
    refs.backToSearchBtn.removeEventListener('click', onHomeButtonClick);
    refs.logoLink.removeEventListener('click', onHomeButtonClick);
    refs.sliderSection.classList.remove('visually-hidden');
    refs.sectionGenres.classList.remove('visually-hidden');
    refs.movieContainer.classList.remove('visually-hidden');
    refs.watchedContainer.classList.add('visually-hidden');
    refs.queueContainer.classList.add('visually-hidden');
    refs.paginationContainer.classList.remove('visually-hidden');
}

function onQueueButtonClick() {
    refs.watchedContainer.classList.add('visually-hidden');
    refs.watchedButton.addEventListener('click', onWatchedButtonClick);
    refs.queueButton.removeEventListener('click', onQueueButtonClick);
    refs.watchedButton.classList.remove('is-btn-active');
    refs.queueButton.classList.add('is-btn-active');
    renderQueueList(); //функция которая рендерит список фильмов "Хочу смотреть"
}

function onWatchedButtonClick() {
    refs.queueContainer.classList.add('visually-hidden');
    refs.queueButton.addEventListener('click', onQueueButtonClick);
    refs.watchedButton.removeEventListener('click', onWatchedButtonClick);
    refs.queueButton.classList.remove('is-btn-active');
    refs.watchedButton.classList.add('is-btn-active');
    renderWatchedList();
}

function renderWatchedList() {
    const filmes = JSON.parse(localStorage.getItem('filmsToWatched'));
    console.log(filmes);
    if (filmes.length === 0) {
        refs.watchedContainer.classList.remove('visually-hidden');
        refs.backToHomeBtn.addEventListener('click', onHomeButtonClick);

        swal("Ей, так не годится", "Дружище, посмотри уже на конец что-нибудь", "warning");
    } else {
        refs.watchedContainer.classList.replace('watched-list', 'movie-list');
        refs.watchedContainer.classList.remove('visually-hidden');
        refs.watchedContainer.innerHTML = '';
        refs.watchedContainer.insertAdjacentHTML('beforeend', galleryTpl(filmes));        
    }
// тут будет функция которая будет рендерить галерею фильмов из сохраненных в соответственном массиве в LocalStorage
}

function renderQueueList() {
    const filmes = JSON.parse(localStorage.getItem('filmsToQueue'));
    console.log(filmes);
    if (filmes.length === 0) {
        refs.queueContainer.classList.remove('visually-hidden');
        refs.backToSearchBtn.addEventListener('click', onHomeButtonClick);

        swal("Ей, так не годится", "Дружище, выбери уже на конец что-нибудь", "warning");
    } else {
        refs.queueContainer.classList.replace('queue-list', 'movie-list');
        refs.queueContainer.classList.remove('visually-hidden');
        refs.queueContainer.innerHTML = '';
        refs.queueContainer.insertAdjacentHTML('beforeend', galleryTpl(filmes));
    }
// тут будет функция которая будет рендерить галерею фильмов из сохраненных в соответственном массиве в LocalStorage
}

function renderMoviesGallery () {
    filmoteka.resetPage();
    filmoteka.getAllMovies()
    .then(renderPopularMovie)
    .catch(error => {
      console.log(error);
    }); 
};

addListenerToLibraryBtn();