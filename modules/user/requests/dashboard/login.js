const z = require("zod");

const schema = z.object({
  // In this example we will only validate the request body.
  body: z.object({
    // email should be valid and non-empty
    email: z.string().email(),
    // password should be at least 6 characters
    password: z.string().min(6),
  }),
});

module.exports = schema;
