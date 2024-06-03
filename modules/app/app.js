// var dashboardRoutes = require(modules.path("user::routes/dashboard/route"));
var Routes = require(modules.path("app::routes/dashboard/route"));
const expressLayouts = require("express-ejs-layouts");

module.exports = (app) => {
  app.use(expressLayouts);
  app.set("layout", modules.component("layouts/default-app"));
  app.use("/dashboard", Routes);
};
