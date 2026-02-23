const { toJSON } = require("./toJSON.plugin");
const paginate = require("./paginate.plugin");
const doesIdExists = require("./doesIdExists.plugin");
module.exports = { paginate, toJSON, doesIdExists };
