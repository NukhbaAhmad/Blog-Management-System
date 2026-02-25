const Joi = require("joi");

const loginUser = {
  body: Joi.object().keys({
    identifier: Joi.string().required().trim(),
    password: Joi.string().required().trim(),
  }),
};

module.exports = { loginUser };
