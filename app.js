const express = require("express");
const app = express();
const db = require("./db");
const session = require("express-session");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const checkAuth = require("./middlewares/checkAuth");
const AuthRouter = require("./routes/authRoutes");
const TaskRouter = require("./routes/taskRoutes");
require("dotenv").config();

db.connect();

// Set view engine
app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use("/tasks", checkAuth);

// routes
app.use("/users", AuthRouter);
app.use("/tasks", TaskRouter);

app.get("/", (req, res) => {
  res.render("home");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
