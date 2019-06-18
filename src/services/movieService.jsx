import http from "../services/httpService";
import { apiEndpoint } from "../config.json";

export function getMovies() {
  return http.get(`${apiEndpoint}/movies`);
}
export function getMovie(movieId) {
  return http.get(`${apiEndpoint}/movies/${movieId}`);
}
export function saveMovie(movie) {
  if (movie.id) {
    const body = { ...movie };
    delete body.id;
    return http.put(`${apiEndpoint}/movies/movie.id}`, body);
  }
  return http.post(`${apiEndpoint}/movies`, movie);
}
export function deleteMovie(MovieId) {
  return http.delete(`${apiEndpoint}/movies/${MovieId}`);
}
