const Joi = require("joi");
const { status: httpStatus } = require("http-status");
const { ApiError, pick } = require("../utils");

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ["query", "body"]);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({
      errors: { label: "key", wrap: { label: false } },
      abortEarly: false,
    })
    .validate(object);

  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    const err = new ApiError(httpStatus.BAD_REQUEST, errorMessage);
    return next(err);
  }

  Object.assign(req, value);
  return next();
};

module.exports = validate;
