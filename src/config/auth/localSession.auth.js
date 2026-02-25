const passport = require("passport");
const httpStatus = require("http-status");
const { Strategy: LocalStrategy } = require("passport-local");
const { Author } = require("../../models");
const { ApiError } = require("../../utils");

const strategyOptions = {
  usernameField: "identifier",
  passwordField: "password",
  session: true,
};
const strategy = async (identifier, password, done) => {
  try {
    const user = await Author.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });
    if (!user) {
      return done(null, false, {
        message: "Invalid username or password.",
        isOperational: true,
      });
    }
    const isMatch = user.password === password;
    if (!isMatch) {
      return done(null, false, {
        message: "Invalid username or password.",
        isOperational: true,
      });
    }
    return done(null, user, { message: "User logged in successfully." });
  } catch (error) {
    return done(error);
  }
};

// Serialize --> Called once on login --> saves id to redis
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize --> Called on every request
// User id in cookies --> find user --> if found --> req.user --> request is validated
passport.deserializeUser(async (id, done) => {
  const user = await Author.findById(id);
  if (!user) {
    done(
      new ApiError({
        statusCode: httpStatus.NOT_FOUND,
        message: "User not found.",
      })
    );
  } else {
    // Added to req.user
    done(null, user);
  }
});
const localStrategyWithSessions = new LocalStrategy(strategyOptions, strategy);
passport.use("local", localStrategyWithSessions);
module.exports = localStrategyWithSessions;
