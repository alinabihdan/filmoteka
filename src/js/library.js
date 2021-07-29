import refs from './refs';
import watchedGalleryTpl from '../templates/watched-gallery.hbs';
import queueGalleryTpl from '../templates/queue-gallery.hbs';
import galleryTpl from '../templates/main-gallery.hbs';
function addListenersToHomeAndLibrary() { // вешает слушатели на кнопки "Home" и "Library"
    refs.libraryButton.addEventListener('click', onLibraryButtonClick);
    refs.homeButton.addEventListener('click', onHomeButtonClick);
}

function onLibraryButtonClick() { 
    refs.header.classList.replace('home-header', 'my-library-header');
    refs.homeButton.classList.remove('current');
    refs.libraryButton.classList.add('current');
    refs.searchForm.classList.add('visually-hidden');
    refs.watchedButton.classList.remove('visually-hidden');
    refs.queueButton.classList.remove('visually-hidden');
    refs.sliderSection.classList.add('visually-hidden');
    refs.queueButton.addEventListener('click', onQueueButtonClick);
    renderWatchedList(); //функция которая рендерит список просмотренных фильмов
}

function onHomeButtonClick() {
    refs.header.classList.replace('my-library-header', 'home-header');
    refs.libraryButton.classList.remove('current');
    refs.homeButton.classList.add('current');
    refs.searchForm.classList.remove('visually-hidden');
    refs.watchedButton.classList.add('visually-hidden');
    refs.queueButton.classList.add('visually-hidden');
    refs.watchedButton.removeEventListener('click', onWatchedButtonClick);
    refs.queueButton.removeEventListener('click', onQueueButtonClick);
}

function onQueueButtonClick() {
    refs.watchedButton.addEventListener('click', onWatchedButtonClick);
    refs.queueButton.removeEventListener('click', onQueueButtonClick);
    refs.watchedButton.classList.remove('is-btn-active');
    refs.queueButton.classList.add('is-btn-active');
    renderQueueList(); //функция которая рендерит список фильмов "Хочу смотреть"
}

function onWatchedButtonClick() {
    refs.queueButton.addEventListener('click', onQueueButtonClick);
    refs.watchedButton.removeEventListener('click', onWatchedButtonClick);
    refs.queueButton.classList.remove('is-btn-active');
    refs.watchedButton.classList.add('is-btn-active');
    renderWatchedList();
}

function renderWatchedList() {
    refs.moviesGallery.innerHTML = '';
    let watched = localStorage.getItem('watched');
    console.log(watched);
    if (watched === null || '') {
        const markUp = watchedGalleryTpl();
        console.log(markUp);
        refs.moviesGallery.innerHTML = markUp;
    }
// тут будет функция которая будет рендерить галерею фильмов из сохраненных в соответственном массиве в LocalStorage
}

function renderQueueList() {
    refs.moviesGallery.innerHTML = '';
    let queue = localStorage.getItem('queue');
    console.log(queue);
    if (queue === null || '') {
        const markUp = queueGalleryTpl();
        console.log(markUp);
        refs.moviesGallery.innerHTML = markUp;
    }
// тут будет функция которая будет рендерить галерею фильмов из сохраненных в соответственном массиве в LocalStorage
}

addListenersToHomeAndLibrary();