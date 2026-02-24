const { Strategy: LocalStrategy } = require("passport-local");
const { Author } = require("../../models");

// IN LOCAL STRATRGY THE --> AFTER REQUEST THE SERVER DONT REMEBER ANYTHING RELATED TO USER, HENCE REJECTING ACCESS TO OTHER APIS
// Local Strategy must work with the either JWT OR SESSIONS

const localStrategyOptions = {
  usernameField: "identifier",
  passwordField: "password",
  session: false,
};
const strategy = async (identifier, password, done) => {
  try {
    const user = await Author.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });
    if (!user) {
      // done: error, data, message
      return done(null, false, {
        message: "Invalid username or password.",
      });
    }
    const isMatch = user.password === pasword;
    if (!isMatch) {
      return done(null, false, {
        message: "Invalid username or password.",
      });
    }
    return done(null, user, { message: "User Logged in successfully." });
  } catch (error) {
    return done(error);
  }
};

const localStrategy = new LocalStrategy(localStrategyOptions, strategy);
module.exports = localStrategy;
