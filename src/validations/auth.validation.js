const Joi = require("joi");
const { password } = require("./custom.validations");

const registerUser = {
  body: Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string().custom(password).required(),
  }),
};

const loginUser = {
  body: Joi.object().keys({
    identifier: Joi.string().required().trim(),
    password: Joi.string().required().trim(),
  }),
};

/* ? INFO: When you use app.use(cookieParser("my_secret_key"))
Express automatically moves any cookie that starts with
s: from req.cookies into req.signedCookies*/
const logoutUser = {
  signedCookies: Joi.object().keys({
    session_id: Joi.string().required().messages({
      "any.required": "User is not currently signed in.",
    }),
  }),
};
module.exports = { loginUser, logoutUser, registerUser };
