var validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    next();
  } catch (err) {
    let errors = {};

    err.errors.map((error) => {
      errors[error.path[1]] = error.message;
    });
    return res.status(400).json({ errors: errors });
  }
};

module.exports = validate;
