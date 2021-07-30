import refs from './refs';
import { transformDate, transformGenre } from './changeDateAndGenres';
import genresTemplate from '../templates/genres.hbs';
import mainGalleryTpl from '../templates/main-gallery.hbs';
import oopsTpl from '../templates/oops.hbs';
import filmoteka from './ApiService';
import { renderPopularMovies } from './movies-gallery';

addGenresListeners();

async function addGenresListeners() {
  await renderGenreButtons();

  const genreBtnList = document.querySelector('.genre-button-list');
  const allGenresBtn = document.getElementById('li-genre-all');

  genreBtnList.addEventListener('click', onGenreButtonClick);
  allGenresBtn.addEventListener('click', onAllGenresBtnClick);
}

async function renderGenreButtons() {
  const genres = await filmoteka.fetchGenres();
  const markup = genresTemplate(genres);
  refs.genresContainer.insertAdjacentHTML('beforeend', markup);
}

async function onAllGenresBtnClick(e) {
  console.log(e.target);
  if (e.target.classList.contains('js-genre-all-label')) {
    filmoteka.resetPage();
    renderPopularMovies();
  }
}

async function onGenreButtonClick(e) {
  // e.target.classList.toggle('checked');
  if (e.target.nodeName !== 'LABEL') return;
  const buttonId = e.target.dataset.id;
  const { page, results, total_pages, total_results } = await filmoteka.fetchMoviesByGenre(
    buttonId,
  );

  if (results.length === 0) {
    // onHideBtnClick();
    clearContainer(refs.movieContainer);
    renderMarkup(refs.movieContainer, oopsTpl);
    refs.paginationContainer.style.display = 'none';
    return;
  }

  const genresObj = await filmoteka.fetchGenres();
  const genresList = [...genresObj];
  console.log(genresList);

  transformDate(results);
  transformGenre(results, genresList);

  if (total_pages <= 1) {
    refs.paginationContainer.style.display = 'none';
  } else {
    refs.paginationContainer.style.display = 'block';
  }

  refs.movieContainer.innerHTML = mainGalleryTpl(results);
}

// нужно прописать логику снятия листенеров

// полезные функции
function renderMarkup(nameContainer, fnTemplates) {
  nameContainer.insertAdjacentHTML('beforeend', fnTemplates());
}

function clearContainer(nameContainer) {
  nameContainer.innerHTML = '';
}
