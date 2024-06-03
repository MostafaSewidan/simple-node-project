var express = require("express");
var router = express.Router();
var { isAuth } = require(modules.path(
  "user::middlewares/dashboard/AuthMiddleware"
));

var { homeIndex } = require(modules.path(
  "app::controllers/dashboard/HomeController"
));

router.get("/", isAuth, homeIndex);

module.exports = router;
