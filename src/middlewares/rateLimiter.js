const { rateLimit } = require("express-rate-limit");
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  skipSuccessfulRequests: true,
  message: "Requests limit exceeded.Please try again later.",
});

module.exports = rateLimiter;
