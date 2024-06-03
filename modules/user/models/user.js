const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("@config/database");
class User extends Model {}

User.init(
  {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
  },
  {
    scopes: {
      active: {
        where: {
          status: true,
        },
      },
    },
    sequelize,
    modelName: "users",
  }
);

module.exports = User;
