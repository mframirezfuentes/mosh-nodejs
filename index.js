const express = require("express");
const mongoose = require("mongoose");
const genres = require("./src/routes/genres");
const customers = require("./src/routes/customers");
const app = express();

mongoose
  .connect(process.env.URI)
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.error("Could not to connect to mongdb", err));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);

app.listen(3000, () => console.log("Listen to port 3000"));
