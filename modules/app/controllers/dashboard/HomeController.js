// const User = require(modules.path("user::models/user"));

const homeIndex = async (req, res) => {
  return modules.dashboardRender(req, res, "app::dashboard/index");
};

module.exports = { homeIndex };
