import movieCardTpl from '../templates/main-gallery.hbs';
import refs from './refs';
import filmoteka from './ApiService';

filmoteka
  .getAllMovies()
  .then(renderPopularMovie)
  .catch(error => {
    console.log(error);
  });

function renderPopularMovie(data) {
  const murkup = movieCardTpl(data);
  // console.log(murkup);
  refs.movieContainer.innerHTML = murkup;
}

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  filmoteka.query = e.currentTarget.elements.query.value;

  if (filmoteka.query === '') {
    return alert('Оповещение: введите название фильма');
  }

  filmoteka.resetPage();

  filmoteka.getMovies().then(resluts => {
    clearMovieContainer();
    renderMovieCard(resluts);
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

export { renderPopularMovie };
