const { genreSchema } = require("../models/genre");
const mongoose = require("mongoose");
const Joi = require("joi");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    trim: true,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().required().min(5).max(50),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().required(),
    dailyRentalRate: Joi.number().required(),
  });

  return schema.validate(movie);
}

async function decNumberInStock(movieId) {
  const movie = await Movie.findByIdAndUpdate(movieId , {
      $inc : { numberInStock : -1}
  });
  movie.save();}

module.exports.Movie = Movie;
module.exports.validate = validateMovie;
module.exports.decNumberInStock = decNumberInStock;