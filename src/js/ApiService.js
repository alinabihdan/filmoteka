const API_KEY = 'api_key=05d7e6695d9ebeb510a995559544df94';
const BASE_URL = 'https://api.themoviedb.org/3';
import { Loader } from '../js/loader';

const loader = new Loader();

class FilmsApiServise {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.totalPages = 1;
    this.storageData = {};
    this.genreId = '';
  }

  // Запрос на популярные фильмы за неделю для главной страницы
  getAllMovies() {
    loader.openLoader();
    const URL_WEEK = `${BASE_URL}/trending/movie/week?${API_KEY}&page=${this.page}&language=en-US`;
    return fetch(URL_WEEK)
      .then(response => {
        return response.json();
      })
      .finally(loader.closeLoader());
  }

  // Запрос на поиск по слову
  getMovies() {
    loader.openLoader();
    const url = `${BASE_URL}/search/movie?${API_KEY}&query=${this.searchQuery}&page=${this.page}&language=en-US`;
    return fetch(url)
      .then(response => {
        return response.json();
      })
      .finally(loader.closeLoader());
  }

  //Запрос на фильм по id
  getMovieByID(id) {
    loader.openLoader();
    return fetch(`${BASE_URL}/movie/${id}?${API_KEY}&language=en-US`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Sorry, but we cannot find this film`);
        }
        return response.json();
      })
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
      })
      .finally(loader.closeLoader());
  }

  // запрос на все жанры
  fetchGenres() {
    loader.openLoader();
    const url = `${BASE_URL}/genre/movie/list?${API_KEY}&language=en-US`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        this.genres = [...data.genres];
        return data.genres;
      })
      .finally(loader.closeLoader());
  }

  // запрос на поиск по жанру
  fetchMoviesByGenre() {
    loader.openLoader();
    const url = `${BASE_URL}/discover/movie?${API_KEY}&with_genres=${this.genreId}&page=${this.page}&language=en-US`;
    return fetch(url)
      .then(response => response.json())
      .finally(loader.closeLoader());
  }

  // запрос на популярные за день для слайдера
  renderTrendySliderMovies() {
    loader.openLoader();
    const url = `${BASE_URL}/trending/all/day?${API_KEY}&language=en-US`;
    return fetch(url)
      .then(response => response.json())
      .then(({ results }) => {
        // console.log(results);
        return results;
      })
      .finally(loader.closeLoader());
  }

  incrementPage() {
    this.page += 1;
  }

  decrementPage() {
    this.page -= 1;
  }

  setPage(newPage) {
    this.page = newPage;
  }

  getPage() {
    return this.page;
  }

  resetPage() {
    this.page = 1;
  }

  setTotalPages(pages) {
    this.totalPages = pages;
  }

  getTotalPages() {
    return this.totalPages;
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
