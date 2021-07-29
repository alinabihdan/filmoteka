import movieCardTpl from '../templates/main-gallery.hbs'
import refs from './refs';
import filmsApiService from './ApiService';

filmsApiService.getAllMovies()
.then(renderPopularMovie)
.catch(error => {
    console.log(error);
  });

  
function renderPopularMovie (data) {
    const murkup = movieCardTpl(data);
    // console.log(murkup);
    refs.movieContainer.innerHTML = murkup;
};

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch (e) {
    e.preventDefault();

    filmsApiService.query = e.currentTarget.elements.query.value;

    if (filmsApiService.query === '') {
        return alert('Оповещение: введите название фильма')
    };

    filmsApiService.resetPage();

    filmsApiService.getMovies().then(resluts => {
        clearMovieContainer(); 
        renderMovieCard(resluts);
    });
    
    e.currentTarget.elements.query.value = '';
};

function onLoadMore () {
    filmsApiService.getMovies().then(renderMovieCard);
};

function renderMovieCard (resluts) {
  refs.movieContainer.insertAdjacentHTML('beforeend', movieCardTpl (resluts));
};

function clearMovieContainer() {
    refs.movieContainer.innerHTML = '';
};

export {renderPopularMovie}