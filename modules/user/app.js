// var dashboardRoutes = require(modules.path("user::routes/dashboard/route"));
var authRoutes = require(modules.path("user::routes/dashboard/auth"));

module.exports = (app) => {
  app.use("/dashboard", authRoutes);
};
