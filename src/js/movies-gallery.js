import movieCardTpl from '../templates/main-gallery.hbs';
import refs from './refs';
import filmoteka from './ApiService';
import { transformDate, transformGenre } from './changeDateAndGenres';
import swal from 'sweetalert';

async function renderPopularMovies() {
  const { page, results, total_pages, total_results } = await filmoteka.getAllMovies();

  const genresObj = await filmoteka.fetchGenres();
  const genresList = [...genresObj];
  console.log(genresList);

  transformDate(results);
  transformGenre(results, genresList);

  const markup = movieCardTpl(results);
  refs.movieContainer.insertAdjacentHTML('beforeend', markup);
  const mainTitle = "Привет пользователь!";
  const mainMessage = "Рады приветствовать тебя на нашей страничке! Она предназначена, чтобы облегчить тебе поиск фильмов для просмотра Жми «ОК» и воспользуйся поиском или выбери фильм из списка 'Популярное за неделю'. Также можешь отсортировать фильмы по жанрам. При клике на постер фильма откроется окно с подробной информацией о фильме. Ты можешь добавить фильм в список 'Уже смотрел!' или 'Хочу смотреть!'. Приятного пользования! С любовью студенты GoIT группы CIV-team!";
  swal(mainTitle, mainMessage,);
}

// вызываем рендер главной страницы
renderPopularMovies();

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();

  filmoteka.query = e.currentTarget.elements.query.value;

  if (filmoteka.query === '' || !filmoteka.query.trim()) {
    // return alert('Оповещение: введите название фильма');
    swal("Поиск не удался", "Введи правильное название фильма и попробуй еще раз", "error", {button: false, timer: 3000,});
    return
  }

  filmoteka.resetPage();

  filmoteka.getMovies().then(resluts => {
     if (resluts.length === 0) {
    swal("Поиск не удался", "Введи правильное название фильма и попробуй еще раз", "error", {button: false, timer: 3000,}); 
    return;
  }
    clearMovieContainer();
    renderMovieCard(resluts);
    const inputValue = "Введенное значение";
    swal("Есть", `Вот результаты поиска по запросу ${inputValue}`, "success", {button: false, timer: 3000,});
  });
  e.currentTarget.elements.query.value = '';
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

export { renderPopularMovies };
