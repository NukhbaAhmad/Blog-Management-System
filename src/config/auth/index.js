const localStrategy = require("./localStrategy.passport.js");
const localStrategyWithSessions = require("./localSession.passport.js");

module.exports = { localStrategy, localStrategyWithSessions };
