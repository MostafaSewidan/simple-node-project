var express = require("express");
var router = express.Router();

const { login, loginView } = require(modules.path(
  "user::controllers/dashboard/AuthController"
));

const loginValidateSchema = require(modules.path(
  "user::requests/dashboard/login"
));

var guest = require(modules.path(
  "user::middlewares/dashboard/GuestMiddleware"
));

const validate = require(modules.path("app::middlewares/validationMiddleware"));

router.get("/login", guest, loginView);
router.post("/login", guest, validate(loginValidateSchema), login);

module.exports = router;
