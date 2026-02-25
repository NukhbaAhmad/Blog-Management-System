const express = require("express");
const passport = require("passport");
const routes = require("./routes/v1");
const {
  errorConverter,
  errorHandler,
  rateLimiter,
  sessionConfig,
} = require("./middlewares");

// Local Strategy
// require("./config/auth/localStrategy.auth");

// Local Strategy with sessions
require("./config/auth/localSession.auth");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionConfig);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/v1", routes);

// Security
app.use(rateLimiter);

// Error handlers
app.use(errorConverter);
app.use(errorHandler);
module.exports = app;
