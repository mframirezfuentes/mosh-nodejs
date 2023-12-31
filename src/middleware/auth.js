const jtw = require("jsonwebtoken");
require("dotenv").config();

function auth(req, res, next) {
  const token = req.header('x-auth-token')
  if (!token) res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jtw.verify(token, process.env.JWT_TOKEN);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token");
  }
}

module.exports = auth;
