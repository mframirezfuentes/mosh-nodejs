const express = require("express");
require("express-async-errors");
const winston = require("winston");
require('winston-mongodb')
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const auth = require("./src/routes/auth");
const users = require("./src/routes/users");
const rental = require("./src/routes/rental");
const movies = require("./src/routes/movies");
const genres = require("./src/routes/genres");
const customers = require("./src/routes/customers");
const error = require("./src/middleware/error");

winston.add(new winston.transports.File({ filename: "logfile.log" }));
winston.add(new winston.transports.MongoDB({db: 'mongodb://localhost/movies'}))

mongoose
  .connect(process.env.URL_MOVIES)
  .then(() => console.log("Mongodb connected"))
  .catch((err) => console.log("Could not to connect to MONGODB", err));

app.use(express.json());

app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/rentals", rental);
app.use("/api/v1/movies", movies);
app.use("/api/v1/customers", customers);
app.use("/api/v1/genres", genres);
app.use(error);
app.use;

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listen to port ${port}`));
