const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const { Movies, validationMovies } = require("../models/movies");
const { Genre } = require("../models/genre");

router.get("/", async (req, res) => {
  const movies = await Movies.find().sort("name");
  res.status(200).send(movies);
});

router.post("/", auth, async (req, res) => {
  const { error } = validationMovies(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid Genre");

  let movie = await Movies({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  movie = await movie.save();
  res.status(201).send(movie);
});

router.get("/:id", async (req, res) => {
  const movie = await Movies.findById(req.params.id);
  if (!movie) return res.status(400).send("Could not found that id");
  res.send(movie);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre.");

  const movie = await Movie.findByIdAndUpdate(
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
    { new: true }
  );

  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(movie);
});

router.delete("/:id", auth, async (req, res) => {
  const movie = await Movies.findByIdAndDelete(req.params.id);
  if (!movie) return res.status(400).send("Could not found that ID");
  res.send(movie);
});

module.exports = router;
