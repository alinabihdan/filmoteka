function changeDateAndGenres(movies, genresList) {
  movies.forEach(movie => {
    if (movie.release_date != undefined) {
      movie.release_date = movie.release_date.slice(0, 4);
    }
    const genresIds = movie.genre_ids;
    genresIds.forEach((genreId, index, array) => {
      const genresItem = genresIds.find(genre => genre.id === genreId);
      const idx = genresIds.indexOf(genresItem);
      array[index] = genresIds[idx].name;
    });
    movie.genre_ids = genresIds.join(', ');
  });
}

export { changeDateAndGenres };
