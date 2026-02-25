const Joi = require("joi");
const { status: httpStatus } = require("http-status");
const { ApiError, pick } = require("../utils");

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ["query", "body", "params"]);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema).validate(object, {
    errors: { label: "key", wrap: { label: false } },
    abortEarly: false,
  });

  if (error) {
    const errors = error.details.map((detail) => ({
      message: detail.message,
      field: detail.path[detail.path.length - 1],
    }));
    const message = "Validation Error";
    const err = new ApiError({
      statusCode: httpStatus.BAD_REQUEST,
      message,
      isOperational: true,
      errors,
    });

    return next(err);
  }
  Object.assign(req, value);
  return next();
};

module.exports = validate;
