import * as genresAPI from "./fakeGenresService";
const movies = [
  {
    id: 1,
    title: "abc",
    genre: { id: 1, name: "Action" },
    numberInStock: 6,
    dailyRentalRate: 2.5,
    publiceDate: "10/11/2018",
    liked: true
  },
  {
    id: 2,
    title: "Terminator",
    genre: { id: 1, name: "Action" },
    numberInStock: 6,
    dailyRentalRate: 3.5,
    publiceDate: "10/11/2018"
  },
  {
    id: 3,
    title: "Terminator",
    genre: { id: 1, name: "Action" },
    numberInStock: 6,
    dailyRentalRate: 2.5,
    publiceDate: "10/11/2018"
  },
  {
    id: 4,
    title: "Terminator",
    genre: { id: 1, name: "Action" },
    numberInStock: 6,
    dailyRentalRate: 2.5,
    publiceDate: "10/11/2018"
  },
  {
    id: 5,
    title: "Terminator",
    genre: { id: 1, name: "Action" },
    numberInStock: 6,
    dailyRentalRate: 2.5,
    publiceDate: "10/11/2018"
  },
  {
    id: 6,
    title: "Terminator",
    genre: { id: 1, name: "Action" },
    numberInStock: 6,
    dailyRentalRate: 2.5,
    publiceDate: "10/11/2018"
  },
  {
    id: 7,
    title: "Terminator",
    genre: { id: 1, name: "Action" },
    numberInStock: 6,
    dailyRentalRate: 2.5,
    publiceDate: "10/11/2018"
  },
  {
    id: 8,
    title: "Terminator",
    genre: { id: 2, name: "Comedy" },
    numberInStock: 6,
    dailyRentalRate: 2.5,
    publiceDate: "10/11/2018"
  },
  {
    id: 9,
    title: "Terminator",
    genre: { id: 2, name: "Comedy" },
    numberInStock: 6,
    dailyRentalRate: 2.5,
    publiceDate: "10/11/2018"
  },
  {
    id: 10,
    title: "Terminator",
    genre: { id: 2, name: "Comedy" },
    numberInStock: 6,
    dailyRentalRate: 2.5,
    publiceDate: "10/11/2018"
  },
  {
    id: 11,
    title: "Terminator",
    genre: { id: 2, name: "Comedy" },
    numberInStock: 6,
    dailyRentalRate: 2.5,
    publiceDate: "10/11/2018"
  },
  {
    id: 12,
    title: "Terminator",
    genre: { id: 2, name: "Comedy" },
    numberInStock: 6,
    dailyRentalRate: 2.5,
    publiceDate: "10/11/2018"
  },
  {
    id: 13,
    title: "Terminator",
    genre: { id: 2, name: "Comedy" },
    numberInStock: 6,
    dailyRentalRate: 2.5,
    publiceDate: "10/11/2018"
  },
  {
    id: 14,
    title: "Terminator",
    genre: { id: 3, name: "Thiller" },
    numberInStock: 6,
    dailyRentalRate: 2.5,
    publiceDate: "10/11/2018"
  },
  {
    id: 15,
    title: "Terminator",
    genre: { id: 3, name: "Thiller" },
    numberInStock: 6,
    dailyRentalRate: 2.5,
    publiceDate: "10/11/2018"
  },
  {
    id: 16,
    title: "Terminator",
    genre: { id: 3, name: "Thiller" },
    numberInStock: 6,
    dailyRentalRate: 2.5,
    publiceDate: "10/11/2018"
  },
  {
    id: 17,
    title: "Terminator",
    genre: { id: 3, name: "Thiller" },
    numberInStock: 6,
    dailyRentalRate: 2.5,
    publiceDate: "10/11/2018"
  }
];
export function getMovies() {
  return movies;
}
export function getMovie(id) {
  return movies.find(m => m.id === id);
}
export function saveMovie(movie) {
  let movieInDb = movies.find(m => m.id === movie.id) || {};
  movieInDb.title = movie.title;
  movieInDb.genre = genresAPI.genres.find(
    g => g.id === parseInt(movie.genreId)
  );
  movieInDb.numberInStock = movie.numberInStock;
  movieInDb.dailyRentalRate = movie.dailyRentalRate;
  if (!movieInDb.id) {
    movieInDb.id = Date.now().toString();
    movies.push(movieInDb);
  }
  return movieInDb;
}
