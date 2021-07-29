import MovieApiServise from './ApiService';
import movieCardTpl from '../templates/main-gallery.hbs';
import refs from './refs';
    
const movieApiServise = new MovieApiServise();

movieApiServise.getAllMovies()
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

function onSearch (e) {
    e.preventDefault();

    movieApiServise.query = e.currentTarget.elements.query.value;

    if (movieApiServise.query === '') {
        return alert('Оповещение: введите название фильма')
    }
    movieApiServise.resetPage()

    movieApiServise.getMovies().then(resluts => {
        clearMovieContainer(); 
        renderMovieCard(resluts);
    })
    
    e.currentTarget.elements.query.value = '';
}

function renderMovieCard (resluts) {
  refs.movieContainer.insertAdjacentHTML('beforeend', movieCardTpl (resluts));
}

function clearMovieContainer() {
    refs.movieContainer.innerHTML = '';
}

