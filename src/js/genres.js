import refs from './refs';
// import changeDateAndGenres from './changeDateAndGenres';
import genresTemplate from '../templates/genres.hbs';
import mainGalleryTpl from '../templates/main-gallery.hbs';
import oopsTpl from '../templates/oops.hbs';

class ApiGenres {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
  }

  fetchGenres() {
    const url = `${refs.BASE_URL}genre/movie/list?${refs.API_KEY}&language=en-US`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        this.genres = [...data.genres];
        return data.genres;
      });
  }

  fetchMoviesByGenre(genreId) {
    const url = `${refs.BASE_URL}discover/movie?${refs.API_KEY}&with_genres=${genreId}`;
    return fetch(url).then(response => response.json());
  }
}
// создаем эксемпляр класса
const filmoteka = new ApiGenres();

// вызываем метод - получаем массив объектов жанров и рендерим

async function renderGenreButtons() {
  const genres = await filmoteka.fetchGenres();
  const markup = genresTemplate(genres);
  refs.genresContainer.insertAdjacentHTML('beforeend', markup);
}

// renderGenreButtons();

async function onGenreButtonClick(e) {
  // e.target.classList.toggle('checked');
  const buttonId = e.target.dataset.id;
  const { page, results, total_pages, total_results } = await filmoteka.fetchMoviesByGenre(
    buttonId,
  );

  if (results.length === 0) {
    // onHideBtnClick();
    clearContainer(refs.moviesGallery);
    renderMarkup(refs.moviesGallery, oopsTpl);
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

  refs.moviesGallery.innerHTML = mainGalleryTpl(results);
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

function transformDate(results) {
  results.forEach(result => {
    if (result.release_date != undefined) {
      result.release_date = result.release_date.slice(0, 4);
    }
  });
}

function transformGenre(results, genresList) {
  results.forEach(result => {
    const genresToTransform = result.genre_ids;
    genresToTransform.forEach((idOfGenre, index, array) => {
      const genresListItem = genresList.find(genre => genre.id === idOfGenre);
      const idx = genresList.indexOf(genresListItem);
      array[index] = genresList[idx].name;
    });
    result.genres_ids = genresToTransform.join(', ');
  });
}

addGenresListeners();
