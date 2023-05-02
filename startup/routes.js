const express = require('express');
//const cors = require('cors');
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const movies = require('../routes/movies');
const auth = require('../routes/auth');
const error = require('../middleware/error');



module.exports = function (app) {
  //app.use(cors());
  app.use(express.json());
  app.use("/api/genres", genres);
  app.use("/api/movies", movies);
  app.use("/api/customers", customers);
  app.use("/api/rentals", rentals);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};
