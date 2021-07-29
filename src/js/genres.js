import refs from './refs';
import genresTemplate from '../templates/genres.hbs';

class ApiGenres {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
    this.qenres = [];
  }

  fetchGenres() {
    const url = refs.BASE_URL + 'genre/movie/list?' + refs.API_KEY + '&language=en-US';
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        this.genres = [...data.genres];
        return data.genres;
      });
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

renderGenreButtons();

function onChooseGenreButtonClick(e) {
  e.target.classList.add('visually-hidden');
  refs.genresWrapper.classList.remove('visually-hidden');
}

async function addGenresListeners() {
  await renderGenreButtons();

  const genreBtnList = document.querySelector('.genre-button-list');
  genreBtnList.addEventListener('click', onGenreButtonClick);
}
