const mongoose = require("mongoose");
const Joi = require("joi");

const Customer = mongoose.model(
  "Customers",
  new mongoose.Schema({
    isGold: { type: Boolean, default: false },
    name: { type: String, required: true, minlenghth: 5, maxlength: 50 },
    phone: { type: String, required: true, minlenghth: 5, maxlength: 50 },
  })
);

const validateCustomer = (customer) => {
  const schema = Joi.object({
    isGold: Joi.boolean().required(),
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
  });

  return schema.validate(customer);
};

module.exports = { Customer, validateCustomer };
