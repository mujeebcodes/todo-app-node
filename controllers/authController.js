const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

// Registration
exports.getRegister = (req, res) => {
  res.render("signup");
};

exports.postRegister = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });
    req.flash("success", "Registration successful. Please log in.");
    res.redirect("/users/login");
  } catch (error) {
    req.flash("error", "Registration failed. Please try again.");
    res.redirect("/users/signup");
  }
};

// Login
exports.getLogin = (req, res) => {
  res.render("login");
};

exports.postLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000 }); // Expires in 1 hour
      res.redirect("/tasks");
    } else {
      req.flash("error", "Invalid username or password.");
      res.redirect("/users/login");
    }
  } catch (error) {
    req.flash("error", "Login failed. Please try again.");
    res.redirect("/users/login");
  }
};

// Logout
exports.logout = (req, res) => {
  req.flash("success", "Logged out successfully.");
  res.clearCookie("jwt"); // Clear the JWT cookie
  res.redirect("/");
};
