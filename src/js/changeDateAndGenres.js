function transformDate(results) {
  results.forEach(result => {
    if (result.release_date != undefined) {
      result.release_date = result.release_date.slice(0, 4);
    }
  });
}

function transformGenre(results, genresList) {
  results.forEach(result => {
    const genresToTransform = result.genre_ids;
    genresToTransform.forEach((idOfGenre, index, array) => {
      const genresListItem = genresList.find(genre => genre.id === idOfGenre);
      const idx = genresList.indexOf(genresListItem);
      array[index] = genresList[idx].name;
    });
    result.genres_ids = [...genresToTransform].join(', ');
  });
}

export { transformDate, transformGenre };
