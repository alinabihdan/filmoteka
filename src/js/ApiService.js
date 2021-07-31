const API_KEY = 'api_key=05d7e6695d9ebeb510a995559544df94';
const BASE_URL = 'https://api.themoviedb.org/3';

class FilmsApiServise {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.storageData = {};
  }

  // Запрос на популярные фильмы за неделю для главной страницы
  getAllMovies() {
    const URL_WEEK = BASE_URL + '/trending/movie/week?' + API_KEY + `&page=${this.page}`;
    return fetch(URL_WEEK).then(response => {
      return response.json();
    });
  }

  // Запрос на поиск по слову
  getMovies() {
    const url = `${BASE_URL}/search/movie?${API_KEY}&query=${this.searchQuery}&page=${this.page}&language=en-US&language=ru-RU`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        // this.incrementPage();
        // console.log(data.results);
        return data.results;
      });
  };

  //Запрос на фильм по id 
  getMovieByID (id) {
    return fetch(`${BASE_URL}/movie/${id}?${API_KEY}&language=en-US`)
     .then(response => { 
        if(!response.ok) {
            throw new Error(`Sorry, but we cannot find this film`);
        }
        return response.json()})
      .then(film => { 
        this.storageData = {
          id: film.id,
          title: film.title,
          poster_path: film.poster_path,
          genres: film.genres,
          release_date: film.release_date,
          vote_average: film.vote_average,
        }; 
        return film;
      });
  };

// getDataForStorage (film) {
//       this.storageData = {
//       id: film.id,
//       title: film.title,
//       poster_path: film.poster_path,
//       genres: film.genres,
//       release_date: film.release_date,
//       vote_average: film.vote_average,
//       }; 
      
//     return this.storageData;
// }; 

  // запрос на все жанры
  fetchGenres() {
    const url = `${BASE_URL}/genre/movie/list?${API_KEY}&language=en-US`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        this.genres = [...data.genres];
        return data.genres;
      });
  }

  // запрос на поиск по жанру
  fetchMoviesByGenre(genreId) {
    const url = `${BASE_URL}/discover/movie?${API_KEY}&with_genres=${genreId}`;
    return fetch(url).then(response => response.json());
  }

  // запрос на популярные за день для слайдера
  renderTrendySliderMovies() {
    const url = `${BASE_URL}/trending/all/day?${API_KEY}`;
    return fetch(url)
      .then(response => response.json())
      .then(({ results }) => {
        console.log(results);
        return results;
      });
  }
  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

const filmoteka = new FilmsApiServise();
export default filmoteka;
