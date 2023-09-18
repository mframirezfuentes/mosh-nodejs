const express = require("express");
const app = express();
const mongoose = require("mongoose");
const rental = require("./src/routes/rental");
const movies = require("./src/routes/movies");
const genres= require('./src/routes/genres')

mongoose
  .connect("mongodb+srv://mframirezfuentes:C5EVGzPcYJ40cfAq@cluster0.y0lcmo9.mongodb.net/movies")
  .then(() => console.log("Mongodb connected"))
  .catch((err) => console.log("Could not to connect to MONGODB", err));

app.use(express.json());
app.use("/api/v1/rental", rental);
app.use("/api/v1/movies", movies);
app.use("/api/v1/genres", genres);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listen to port ${port}`));
