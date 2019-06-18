import React from "react";
import Aux from "../hoc/aux";
import Joi from "joi-browser";
import Form from "../components/common/form";
import { getMovie, saveMovie } from "./../services/movieService";
import { getGenres } from "./../services/genresService";
class MovieForm extends Form {
  state = {
    data: {
      id: 0,
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    errors: {},
    genres: []
  };
  schema = {
    id: Joi.number(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.number()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number In Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate")
  };

  handleSave = () => {
    const { history } = this.props;
    history.push("/movies");
  };
  populateGenres = async () => {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  };
  populateMovie = async () => {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;
      let { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.history.replace("/page-not-found");
      }
    }
  };
  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }
  mapToViewModel(movie) {
    return {
      id: movie.id,
      title: movie.title,
      genreId: movie.genreId,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }
  doSubmit = async () => {
    await saveMovie(this.state.data);

    this.props.history.push("/movies");
  };
  render() {
    return (
      <Aux>
        <h1>MovieForm</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number In Stock", "number")}
          {this.renderInput("dailyRentalRate", "Daily Rental Rate", "rate")}
          {this.renderButton("Save")}
        </form>
      </Aux>
    );
  }
}
export default MovieForm;
