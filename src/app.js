const express = require("express");
const passport = require("passport");
const { localStrategy } = require("./config");

const app = express();

const routes = require("./routes/v1");

const { errorConverter, errorHandler, rateLimiter } = require("./middlewares");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
passport.use("local", localStrategy);

app.use("/v1", routes);

app.use(rateLimiter);
app.use(errorConverter);
app.use(errorHandler);
module.exports = app;
