const mongoose = require("mongoose");
const Joi = require("joi");

const Rental = mongoose.model(
  "Rental",
  new mongoose.Schema({
    customer: {
      type: new mongoose.Schema({
        name: {
          type: String,
          minlength: 5,
          maxlength: 50,
          required: true,
        },
        isGold: {
          type: Boolean,
          default: false,
        },
        phone: {
          type: String,
          minlength: 5,
          maxlength: 50,
          required: true,
        },
      }),
      required: true,
    },
    movies: {
      type: new mongoose.Schema({
        title: {
          type: String,
          required: true,
          trim: true,
          minlength: 5,
          maxlength: 250,
        },
        dailyRentalRate: {
          type: Number,
          min: 0,
          max: 250,
          required: true,
        },
      }),
      required: true,
    },
    dateOut: {
      type: Date,
      required: true,
      default: Date.now,
    },
    dateReturned: {
      type: Date,
    },
    rentalFee: {
      type: Number,
      min: 0,
    },
  })
);

const validationRental = (rental) => {
  const schema = Joi.object({
    customerId: Joi.string().required(),
    movieId: Joi.string().required(),
  });
  return schema.validate(rental);
};

module.exports = { Rental, validationRental };
