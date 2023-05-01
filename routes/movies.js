const { validate, Movie } = require("../models/movie");
const { Genre } = require("../models/genre");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get("/", async (req, res) => {
  const movies = await Movie.find().sort({ title: 1 });
  res.send(movies);
});

router.post("/", auth ,async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre;
  try {
    genre = await Genre.findById(req.body.genreId);
  } catch (ex) {
    return res.status(404).send("Genre with the given id does not exist");
  }

  let movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });

  movie = await movie.save();
  res.send(movie);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre;
  try {
    genre = await Genre.findById(req.body.genreId);
  } catch (ex) {
    return res.status(404).send("Genre with the given id does not exist");
  }

  let movie;
  try {
    movie = await Movie.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        genre: {
          _id: genre._id,
          name: genre.name,
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
      },
      {
        new: true,
      }
    );
  } catch (ex) {
    return res.status(404).send("Movie with the given id does not exist");
  }

  res.send(movie);
});

router.delete('/:id',[auth, admin], async (req, res) => {
    let movie;
    try{
        movie = await Movie.findByIdAndRemove(req.params.id);
    }
    catch(ex){
        return res.status(404).send("Movie with given id does not exist");
    }
    
    res.send(movie);
});


router.get("/:id", async (req, res) => {
  let movie;
  try {
    movie = await Movie.findById(req.params.id);
  } catch (ex) {
    return res.status(404).send("Movie with the given id does not exist");
  }

  res.send(movie);
});

module.exports = router;
