const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

module.exports = (app) => {
  // MySQL database connection options
  const options = {
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  };

  const sessionStore = new MySQLStore(options);

  // Configure session middleware
  app.use(
    session({
      key: "session_cookie_name",
      secret: process.env.SECRET,
      store: sessionStore,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 24,
      },
    })
  );
};
