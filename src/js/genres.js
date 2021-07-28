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
  //   set genres(value) {
  //     this.genres = value;
  //   }

  //   get genres() {
  //     return this.genres;
  //   }
}

const filmoteka = new ApiGenres();

filmoteka.fetchGenres().then(data => {
  appendButtonsMarkup(data);
});

function appendButtonsMarkup(data) {
  refs.genresContainer.insertAdjacentHTML('beforeend', genresTemplate(data));
}
// 0: {id: 28, name: "Action"}
// 1: {id: 12, name: "Adventure"}
// 2: {id: 16, name: "Animation"}
// 3: {id: 35, name: "Comedy"}
// 4: {id: 80, name: "Crime"}
// 5: {id: 99, name: "Documentary"}
// 6: {id: 18, name: "Drama"}
// 7: {id: 10751, name: "Family"}
// 8: {id: 14, name: "Fantasy"}
// 9: {id: 36, name: "History"}
// 10: {id: 27, name: "Horror"}
// 11: {id: 10402, name: "Music"}
// 12: {id: 9648, name: "Mystery"}
// 13: {id: 10749, name: "Romance"}
// 14: {id: 878, name: "Science Fiction"}
// 15: {id: 10770, name: "TV Movie"}
// 16: {id: 53, name: "Thriller"}
// 17: {id: 10752, name: "War"}
// 18: {id: 37, name: "Western"}
// length: 19
