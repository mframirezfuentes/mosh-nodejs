const express = require("express");
const router = express.Router();
const { User, validateUsers } = require("../models/users");

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
  if (user) return res.status(400).send("User already register");

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  user = await user.save();
  res.status(201).send(user);
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

module.exports = router;
