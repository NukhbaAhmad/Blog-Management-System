class ApiError extends Error {
  constructor({
    statusCode,
    message,
    isOperational = true,
    stack = "",
    errors = null,
  }) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (errors && Object.keys(errors).length > 0) {
      this.errors = errors;
    }
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
module.exports = ApiError;
