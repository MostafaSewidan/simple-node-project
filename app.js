var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const fs = require("fs");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
require("module-alias/register");
require("dotenv").config();

const db = require("./config/database");
const modules_statuses = require("./modules_statuses.json");
const viewDirectories = [
  path.join(__dirname, "views"),
  path.join(__dirname, "modules"),
];

var app = express();

const modules = require("./modules/app/utils/modules")(app);
global.modules = modules;

// Connect to the database
db.authenticate()
  .then(() => {})
  .catch((err) => console.error("Error connecting to database:", err));

module.exports = {
  config: path.resolve("config", "config.js"),
};

// view engine setup
app.set("views", viewDirectories);
app.set("view engine", "ejs");

require(`@config/sessionHandller`)(app);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

Object.keys(modules_statuses).forEach(function (module) {
  if (
    modules_statuses[module] &&
    fs.lstatSync(`./modules/${module}`).isDirectory()
  ) {
    require(`./modules/${module}/app.js`)(app);
  }
});

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
