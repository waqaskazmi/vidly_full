import React, { Component } from "react";
import Form from "./common/Form";
import Joi from "joi";
import { getMovie, saveMovie } from "../services/movieService";
import { useParams, useNavigate } from "react-router-dom";
import { getGenres } from "../services/genreService";

function withParamsNavigate(Component) {
  return (props) => (
    <Component {...props} params={useParams()} navigate={useNavigate()} />
  );
}

class MovieForm extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    genres: [],
    errors: {},
  };

  Schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(1)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(1)
      .max(10)
      .label("Daily Rental Rate"),
  };

  async populateGenres(){
    const {data : genres} = await getGenres();
    this.setState({ genres: genres.filter((x) => x._id !== "1") });
  }

  async populateMovies(){
    try{
      const id = this.props.params.id;
      if (id === "new") return;
      const {data:movie} = await getMovie(id);
      this.setState({ data: this.maptoViewModel(movie) });
    }
    catch(ex){
      if (ex.response && ex.response.status ===404){
        this.props.navigate("/notfound");
      } 
    }
  }
  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovies();
  }

  submitForm = async () => {
    await saveMovie(this.state.data);
    this.props.navigate("/movies");
  };

  maptoViewModel = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  render() {
    return (
      <div>
        <h1>
          {this.state.data.title !== ""
            ? "Edit " + this.state.data.title
            : "New Movie"}
        </h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("Title", "title")}
          {this.renderSelect("Genre", "genreId", this.state.genres)}
          {this.renderInput("Number in Stock", "numberInStock")}
          {this.renderInput("Daily Rental Rate", "dailyRentalRate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default withParamsNavigate(MovieForm);
