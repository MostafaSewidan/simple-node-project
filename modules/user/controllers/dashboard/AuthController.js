const userModel = require(modules.path("user::models/user"));
const bcrypt = require("bcrypt");

const loginView = async (req, res) => {
  return res.render(modules.view("user::dashboard/auth/login"));
};

const login = async (req, res) => {
  let user = await userModel.findOne({
    where: { email: req.body.email },
  });

  if (!user)
    return res.status(400).json({ errors: { email: "email is wrong" } });

  const passwordMatch = await bcrypt.compare(req.body.password, user.password);

  if (!passwordMatch) {
    return res.status(400).json({ errors: { password: "password is wrong" } });
  }

  req.session.regenerate(function () {
    req.session.user = {
      id: user.id,
      name: user.name,
    };
    return res
      .status(200)
      .json({ message: "logedin successfuly", url: "/dashboard" });
  });
};

module.exports = { login, loginView };
