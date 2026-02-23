const express = require("express");
const app = express();
const routes = require("./routes/v1");
const { errorConverter, errorHandler, rateLimiter } = require("./middlewares");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/v1", routes);
app.use(rateLimiter);
app.use(errorConverter);
app.use(errorHandler);
module.exports = app;
