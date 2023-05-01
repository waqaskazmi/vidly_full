const { validate, Rental } = require("../models/rental");
const { Customer } = require("../models/customer");
const { decNumberInStock, Movie } = require("../models/movie");
const mongoose = require("mongoose");
const Fawn = require("fawn");
const express = require("express");
const router = express.Router();


Fawn.init('mongodb://127.0.0.1/vidly');
//Fawn.init(mongoose);

router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort({ dateOut: -1 });
  res.send(rentals);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer;
  try {
    customer = await Customer.findById(req.body.customerId);
  } catch (ex) {
    return res.status(404).send("Customer with the given id does not exist");
  }

  let movie;
  try {
    movie = await Movie.findById(req.body.movieId);
  } catch (ex) {
    return res.status(404).send("Movie with the given id does not exist");
  }

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie out of stock");

  let rental = new Rental({
    title: req.body.title,
    customer: {
      _id: customer._id,
      name: customer.name,
      phoneNumber: customer.phoneNumber,
      isGold: customer.isGold,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });

  // try {
  //   new Fawn.Task()
  //     .save("rentals", rental)
  //     .update(
  //       "movies",
  //       { _id: movie._id },
  //       {
  //         $inc: { numberInStock: -1 },
  //       }
  //     )
  //     .run();

  //   res.send(rental);
  // } catch (ex) {
  //   return res.status(500).send("Something failed");
  // }

  const db = await mongoose.createConnection('mongodb://127.0.0.1/vidly').asPromise();
  const session = await db.startSession();

  try {
    await session.withTransaction(async () => {
      rental.save();
      decNumberInStock(movie._id)
      res.send(rental);
    });
  } finally {
    await session.endSession();
    await db.close();
    console.log('ok')
  }

});

module.exports = router;
