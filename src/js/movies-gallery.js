import NewsApiServise from './ApiService';
import movieCardTpl from '../templates/main-gallery.hbs'

// Перенести рефы и сделать импорт
const refs = {
    searchForm: document.getElementById('search-form'),
    movieContainer: document.querySelector('.movie-list'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]'),
}
    
const newsApiServise = new NewsApiServise();

newsApiServise.getAllMovies()
.then(renderPopularMovie)
.catch(error => {
    console.log(error);
  });

  
function renderPopularMovie (data) {
    const murkup = movieCardTpl(data);
    // console.log(murkup);
    refs.movieContainer.innerHTML = murkup;
}

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch (e) {
    e.preventDefault();

    clearMovieContainer();
    newsApiServise.query = e.currentTarget.elements.query.value;
    console.log (newsApiServise.query);

    if (newsApiServise.query === '') {
        return alert('Оповещение: введите название фильма')
    }
    newsApiServise.resetPage()
    // console.log(searchQuery);
    newsApiServise.getMovies().then(resluts => {
        clearMovieContainer();
        renderMovieCard(resluts);
    })
}

function onLoadMore () {
    newsApiServise.getMovies().then(renderMovieCard);
}

function renderMovieCard (resluts) {
  refs.movieContainer.insertAdjacentHTML('beforeend', movieCardTpl (resluts));
}

function clearMovieContainer() {
    refs.movieContainer.innerHTML = '';
}