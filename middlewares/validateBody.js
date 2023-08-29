const { httpError } = require("../helpers");

const validateBody = (schema, errorMessage) => {
  const func = (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(httpError(400, !errorMessage ? error.message : errorMessage));
    }
    next();
  };

  return func;
};

module.exports = validateBody;
