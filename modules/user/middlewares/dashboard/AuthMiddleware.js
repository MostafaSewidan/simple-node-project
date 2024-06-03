const userModel = require(modules.path("user::models/user"));

var isAuth = async (req, res, next) => {
  try {
    if (req.session.user) {
      let user = await userModel.scope("active").findOne({
        where: { id: req.session.user.id },
      });

      if (user) {
        req.authUser = user;
        next();
      } else {
        req.session.destroy();
      }
    } else {
      res.redirect("/dashboard/login");
    }
  } catch (err) {
    return res.status(500).json({ error: "serverError" });
  }
};

module.exports = { isAuth };
