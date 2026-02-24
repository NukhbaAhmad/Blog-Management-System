const passport = require("passport");
const { Author } = require("../models");

const strategyOptions = {
  usernameField: "identifier",
  passwordField: "password",
  session: true,
};
const strategy = async (identifier, password, done) => {
  try {
    const user = Author.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });
    if (!user) {
      return done(null, false, { message: "Invalid username or password." });
    }
    const isMatch = user.password === pasword;
    if (!isMatch) {
      return done(null, false, { message: "Invalid username or password." });
    }
    return done(null, user, { message: "User logged in successfully." });
  } catch (error) {
    return done(error);
  }
};

const localStrategyWithSessions = new LocalStrategy(strategyOptions, strategy);
module.exports = localStrategyWithSessions;
