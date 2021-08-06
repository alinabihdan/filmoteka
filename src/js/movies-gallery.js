import movieCardTpl from '../templates/main-gallery.hbs';
import refs from './refs';
import filmoteka from './ApiService';
import { transformDate, transformGenre } from './changeDateAndGenres';
import { startPagination } from './pagination';
import { startAutoScroll } from './autoscroll';
import swal from 'sweetalert';

async function renderPopularMovies() {
  const { page, results, total_pages, total_results } = await filmoteka.getAllMovies();

  const genresObj = await filmoteka.fetchGenres();
  const genresList = [...genresObj];
  // console.log(genresList);

  filmoteka.totalPages = total_pages;
  transformDate(results);
  transformGenre(results, genresList);

  const markup = movieCardTpl(results);

  clearMovieContainer();
  refs.movieContainer.insertAdjacentHTML('beforeend', markup);
  verificationAddToWatchedButtons();
  verificationAddToQueueButtons();
  startPagination(renderPopularMovies);
  // startAutoScroll();

  if (sessionStorage.mainNotification !== 'showed') {
    const mainTitle = 'Привет, Пользователь!';
    const mainMessage =
      "Рады приветствовать тебя на нашей страничке! Она предназначена, чтобы облегчить тебе поиск фильмов для просмотра Жми «ОК» и воспользуйся поиском или выбери фильм из списка 'Популярное за неделю'. Также можешь отсортировать фильмы по жанрам. При клике на постер фильма откроется окно с подробной информацией о фильме. Ты можешь добавить фильм в список 'Уже смотрел!' или 'Хочу смотреть!'. Приятного пользования! С любовью студенты GoIT группы CIV-team!";
    swal(mainTitle, mainMessage);
    sessionStorage.setItem('mainNotification', 'showed');
  }
}

async function verificationAddToWatchedButtons() {
  const watchedFilms = JSON.parse(localStorage.getItem('filmsToWatched'));
  const buttonsAddToWatched = document.querySelectorAll('#overlay-btn-add-to-watched');
  buttonsAddToWatched.forEach(buttonAddToWatched => {
    const id = buttonAddToWatched.dataset.id;
    watchedFilms.forEach(watchedFilm => {
      if (`${watchedFilm.id}` === id) {
        buttonAddToWatched.textContent = 'delete from watched';
      }
      return
    });
  })
}

async function verificationAddToQueueButtons() {
  const queueFilms = JSON.parse(localStorage.getItem('filmsToQueue'));
  const buttonsAddToQueue = document.querySelectorAll('#overlay-btn-add-to-queue');
  buttonsAddToQueue.forEach(buttonAddToQueue => {
    const id = buttonAddToQueue.dataset.id;
    queueFilms.forEach(queueFilm => {
      if (`${queueFilm.id}` === id) {
        buttonAddToQueue.textContent = 'delete from queue';
      }
      return
    });
  })
}
// вызываем рендер главной страницы
renderPopularMovies();

refs.searchForm.addEventListener('submit', onSearch);

async function onSearch(e) {
  if (e !== undefined) {
    e.preventDefault();

    filmoteka.query = e.currentTarget.elements.query.value;

    if (filmoteka.query === '' || !filmoteka.query.trim()) {
      swal('Поиск не удался', 'Введи правильное название фильма и попробуй еще раз', 'error', {
        button: false,
        timer: 3000,
      });
      return;
    }

    filmoteka.resetPage();
  }

  const { page, results, total_pages, total_results } = await filmoteka.getMovies();
  const genresObj = await filmoteka.fetchGenres();
  const genresList = [...genresObj];
  // console.log(genresList);

  filmoteka.totalPages = total_pages;
  transformDate(results);
  transformGenre(results, genresList);

  if (results.length === 0) {
    swal('Поиск не удался', 'Введи правильное название фильма и попробуй еще раз', 'error', {
      button: false,
      timer: 3000,
    });
    return;
  }

  refs.sectionGenres.classList.add('visually-hidden');
  clearMovieContainer();
  renderMovieCard(results);
  startAutoScroll();
  document.getElementById('search-input').value = '';

  startPagination(onSearch);
}

function onLoadMore() {
  filmoteka.getMovies().then(renderMovieCard);
}

function renderMovieCard(resluts) {
  refs.movieContainer.insertAdjacentHTML('beforeend', movieCardTpl(resluts));
}

function clearMovieContainer() {
  refs.movieContainer.innerHTML = '';
}

export { renderPopularMovies, verificationAddToWatchedButtons, verificationAddToQueueButtons};
