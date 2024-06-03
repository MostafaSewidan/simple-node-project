var glopalPath = require("path");

module.exports = function (app) {
  app.locals.dashboardComponents = glopalPath.join(
    __dirname,
    "../views/dashboard/components/"
  );
  return {
    view: function (path) {
      let module = path.split("::")[0];
      path = path.split("::")[1];

      return `${module}/views/${path}`;
    },
    dashboardRender: function (req, res, path, data = {}) {
      let module = path.split("::")[0];
      path = path.split("::")[1];
      data.layout = this.component("layouts/app.ejs");
      data.authUser = req.authUser;

      return res.render(`${module}/views/${path}`, data);
    },
    path: function (path) {
      let module = path.split("::")[0];
      path = path.split("::")[1];

      return `@modules/${module}/${path}`;
    },
    component: function (path) {
      return app.locals.dashboardComponents + path;
    },
  };
};
