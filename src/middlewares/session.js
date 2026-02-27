const session = require("express-session");
const { redisClient } = require("../config");
const { RedisStore } = require("connect-redis");

const sessionConfig = session({
  store: new RedisStore({ client: redisClient, prefix: "sess:" }),
  secret: "my_secret_key",
  saveUninitialized: false, // Saved only when intialized with data --> no empty save
  resave: false, // Save only on modification,
  name: "session_id",
  cookie: {
    // Pass session id to cookies
    httpOnly: true,
    secure: false, // Must be secure in production
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    sameSite: "lax", // Prevents CSRF attacks
  },
});

module.exports = sessionConfig;
