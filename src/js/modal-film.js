import modalFilmTpl from '../templates/modal-film.hbs'
import refs from './refs';
import filmoteka from './ApiService';

refs.movieContainer.addEventListener('click', fetchAndRenderFilmCard);
refs.slider.addEventListener('click', fetchAndRenderFilmCard);

function  fetchAndRenderFilmCard (e) {
    if (e.target.nodeName === 'IMG') {
        filmoteka.getMovieByID(e.target.dataset.id)
        .then(renderFilmCard)
        .catch(error => {
            console.log(error);
        });
        refs.modalFilmBlackdrop.classList.add('is-active');
        refs.filmModalField.classList.add('is-active');
        refs.bodyEl.classList.add('modal-open');
    };
};

function renderFilmCard (film) {
    refs.modalFilmRenderField.innerHTML = modalFilmTpl(film);
    console.log(filmoteka.storageData);
};

