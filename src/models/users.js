const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minglength: 5,
    maxlength: 100,
    required: true,
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 100,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minglength: 5,
    maxlength: 100,
    required: true,
  },
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_TOKEN
  );
  return token;
};

const User = mongoose.model("Users", userSchema);

const validateUsers = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(100).required(),
    email: Joi.string().min(5).max(100).required().email(),
    password: Joi.string().min(5).max(100).required(),
  });
  return schema.validate(user);
};

module.exports = { User, validateUsers };
