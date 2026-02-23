const express = require("express");
const authorRoutes = require("./author.route");

const router = express.Router();

const routes = [
  { path: "/author", route: authorRoutes },
  // { path: "/blog", route: blogRoutes },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
