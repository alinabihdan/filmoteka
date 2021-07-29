import refs from './refs';
import { transformDate, transformGenre } from './changeDateAndGenres';
import genresTemplate from '../templates/genres.hbs';
import mainGalleryTpl from '../templates/main-gallery.hbs';
import oopsTpl from '../templates/oops.hbs';
// экземпляр класса:
import filmoteka from './ApiService';

async function renderGenreButtons() {
  const genres = await filmoteka.fetchGenres();
  const markup = genresTemplate(genres);
  refs.genresContainer.insertAdjacentHTML('beforeend', markup);
}

async function onGenreButtonClick(e) {
  // e.target.classList.toggle('checked');
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

async function addGenresListeners() {
  await renderGenreButtons();

  const genreBtnList = document.querySelector('.genre-button-list');
  genreBtnList.addEventListener('click', onGenreButtonClick);
}

// полезные функции
function renderMarkup(nameContainer, fnTemplates) {
  nameContainer.insertAdjacentHTML('beforeend', fnTemplates());
}

function clearContainer(nameContainer) {
  nameContainer.innerHTML = '';
}

addGenresListeners();
