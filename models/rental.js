const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);

const rentalSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
        name: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 50,
        },
        phoneNumber: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 50,
        },
        isGold: {
          type: Boolean,
          default: false,
        },
      }),
    required: true
  },
  movie: {
    type: new mongoose.Schema({
        title: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 50,
          trim: true,
        },
        dailyRentalRate: {
          type: Number,
          required: true,
          min: 0,
          max: 255,
        },
      }),
    required: true
  },
  dateOut: {
    type: Date,
    default : Date.now,
    required: true,
  },
  datereturned: {
    type: Date
  },
  rentalFee: {
    type: Number,
    //required: true,
    min: 0
  },
});

const Rental = mongoose.model("Rental", rentalSchema);

function validateRental(rental) {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
  });

  return schema.validate(rental);
}

module.exports.Rental = Rental;
module.exports.validate = validateRental;
