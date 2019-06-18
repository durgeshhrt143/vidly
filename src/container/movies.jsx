import React, { Component } from "react";
import Pagination from "../components/common/pagination";
import ListGroup from "../components/common/listGroup";
import MovieTable from "./../components/movieTable";
import SearchBox from "../components/common/searchBox";
import _ from "lodash";
import { getMovies, deleteMovie } from "../services/movieService";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/genresService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 8,
    currentPage: 1,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" }
  };
  async componentDidMount() {
    const { data } = await getGenres();
    let genres = [{ id: "", name: "All Movies" }, ...data];
    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }
  pageChangeHandler = page => {
    this.setState({ currentPage: page });
  };

  handleDelete = async movie => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter(m => m.id !== movie.id);
    this.setState({ movies });
    try {
      await deleteMovie(movie.id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted");
      this.setState({ movies: originalMovies });
    }
  };
  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handleGenresSelect = genre => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };
  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };
  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };
  getPageData = () => {
    const {
      pageSize,
      currentPage,
      movies: allmovies,
      selectedGenre,
      searchQuery,
      sortColumn
    } = this.state;
    let filtered = allmovies;
    if (searchQuery)
      filtered = allmovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre.id)
      filtered = allmovies.filter(m => m.genre.id === selectedGenre.id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  };
  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn } = this.state;
    const { user } = this.props;

    if (count === 0) return <p>There is no movies in database. </p>;
    const { totalCount, data: movies } = this.getPageData();
    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenresSelect}
          />
        </div>
        <div className="col">
          <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>

          <p>
            Showing (<strong>{totalCount}</strong>) movies in the database.
          </p>
          <SearchBox
            value={this.state.searchQuery}
            onChange={this.handleSearch}
          />
          <MovieTable
            movies={movies}
            onLike={this.handleLike}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemCount={totalCount}
            pageSize={pageSize}
            onPageChange={this.pageChangeHandler}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
