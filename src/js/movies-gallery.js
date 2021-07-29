import NewsApiServise from './ApiService';
import movieCardTpl from '../templates/main-gallery.hbs'
import refs from './refs';
    
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

    newsApiServise.query = e.currentTarget.elements.query.value;

    if (newsApiServise.query === '') {
        return alert('Оповещение: введите название фильма')
    }
    newsApiServise.resetPage()

    newsApiServise.getMovies().then(resluts => {
        clearMovieContainer(); 
        renderMovieCard(resluts);
    })
    
    e.currentTarget.elements.query.value = '';
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