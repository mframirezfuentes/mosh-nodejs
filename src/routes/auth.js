const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const Joi = require("joi");
const express = require("express");
require("dotenv").config();
const router = express.Router();
const { User } = require("../models/users");

router.get("/", async (req, res) => {
  const users = await Users.find().sort("name");
  res.status(200).send(users);
});

router.get("/:email", async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  if (!user) return res.status(400).send("Email invalid");
  res.status(200).send(user);
});

router.post("/", async (req, res) => {
  const { error } = validateUsers(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid eamil or password");

  const validatePasword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!validatePasword)
    return res.status(400).send("Invalid eamil or password");

  const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN);
  res.send(token);
});

router.put("/:email", async (req, res) => {
  const { error } = validateUsers(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOneAndUpdate(
    { email: req.params.email },
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    }
  );

  user = await user.save();
  res.send(user);
});

router.delete("/:email", async (req, res) => {
  const user = await User.findOneAndDelete({ email: req.params.email });
  if (!user) return res.status(400).send("Email invalid");

  res.send(user);
});

const validateUsers = (req) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(100).required().email(),
    password: Joi.string().min(5).max(100).required(),
  });
  return schema.validate(req);
};

module.exports = router;
