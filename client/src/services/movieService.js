import http from "./httpService";
//import config from "../config.json";

export function getMovies() {
  //return http.get(config.apiEndpoint + '/movies');
  return http.get('/movies');
}

export function getMovie(id) {
  return http.get('/movies/' + id);
}

export function saveMovie(movie) {
  let movietoSave = {};
  movietoSave.title = movie.title;
  movietoSave.genreId = movie.genreId;
  movietoSave.numberInStock = movie.numberInStock;
  movietoSave.dailyRentalRate = movie.dailyRentalRate;
  
  if(movie._id){
    return http.put('/movies/' + movie._id, movietoSave);
  }
  else{
    return http.post('/movies', movietoSave);
  }
}

export function deleteMovie(id) {
    return http.delete('/movies/' + id);
}