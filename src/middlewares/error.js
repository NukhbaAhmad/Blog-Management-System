const mongoose = require("mongoose");
const { status: httpStatus } = require("http-status");
const { ApiError } = require("../utils");
const { errorLabels } = require("../constants");

const formatMongooseError = (err) => {
  if (err instanceof mongoose.Error.CastError) {
    const fieldName = err.path === "_id" ? "ID" : err.path;
    return `Invalid ${fieldName}.`;
  }
  if (err instanceof mongoose.Error.ValidationError) {
    return Object.values(err.errors).map((el) => ({
      field: errorLabels.FIELD_LABELS[el.path] || el.path,
      message: el.message,
    }));
  }

  return err.message;
};
const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      err.statusCode ||
      (err instanceof mongoose.Error
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR);

    let message = error.message || httpStatus[statusCode];
    let errors = null;
    if (error instanceof mongoose.Error) {
      const formatted = formatMongooseError(error);
      if (formatted.length > 0) {
        errors = formatted;
        message = "Validation Error";
      } else {
        message = formatted;
        errors = null;
      }
    }
    error = new ApiError({
      statusCode,
      message,
      isOperational: error.isOperational || false,
      stack: err.stack,
      errors,
    });
  }
  next(error);
};
const errorHandler = (err, req, res, next) => {
  const { statusCode, message, errors } = err;
  res.locals.errorMessage = err.message;
  const response = {
    status: statusCode || 500,
    message,
    ...(errors && { errors }),
    // For production dont include stack
  };
  // For development show consoles.
  // console.log("Response Error:", response);

  res.status(statusCode).send(response);
};
module.exports = { errorHandler, errorConverter };
