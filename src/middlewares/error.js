const mongoose = require("mongoose");
const { status: httpStatus } = require("http-status");
const { ApiError } = require("../utils");

const formatMongooseError = (err) => {
  if (err instanceof mongoose.Error.CastError) {
    const fieldName = err.path === "_id" ? "ID" : err.path;
    return `Invalid ${fieldName} format.`;
  }
  if (err instanceof mongoose.Error.ValidationError) {
    return Object.values(err.errors)
      .map((el) => el.message)
      .join(", ");
  }

  return err.message;
};
const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      err.statusCode || err instanceof mongoose.Error
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;

    let message = error.message || httpStatus[statusCode];
    if (error instanceof mongoose.Error) {
      message = formatMongooseError(error);
    }
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};
const errorHandler = (err, req, res, next) => {
  const { statusCode, message } = err;
  res.locals.errorMessage = err.message;
  const response = {
    statusCode,
    message,
    // For production dont include stack
  };
  // For development show consoles.
  // console.log("Response Error:", response);

  res.status(statusCode).send(response);
};
module.exports = { errorHandler, errorConverter };
