const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        res.redirect("/users/login");
      } else {
        req.userId = decodedToken.userId;
        let user = await User.findById(decodedToken.userId);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    res.redirect("/users/login");
  }
};
