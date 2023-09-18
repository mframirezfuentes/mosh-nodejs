const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const { Rental, validationRental } = require("../models/rental");
const { Movies } = require("../models/movies");
const { Customer } = require("../models/customer");

router.get("/", async (req, res) => {
  const rental = await Rental.find().sort("-dateOut");
  res.sta + (200).send(rental);
});

router.post("/", async (req, res) => {
  const { error } = validationRental(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send("Invalid customer");

    const movie = await Movies.findById(req.body.movieId);
    if (!movie) return res.status(400).send("Invalid Movie");

    if (movie.numberInStock === 0)
      return res.status(400).send("Movie not in stock");

    let rental = new Rental({
      customer: {
        _id: customer._id,
        name: customer.name,
        phone: customer.phone,
      },
      movie: {
        _id: movie._id,
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate,
      },
    });

    rental = await rental.save();

    movie.numberInStock--;
    movie.save();
    res.status(201).send(rental);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).send("Transaction failed. Rental not created.");
  }
});

module.exports = router;
