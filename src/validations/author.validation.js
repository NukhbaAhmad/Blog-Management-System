const Joi = require("joi");
const { password, objectId } = require("./custom.validations.js");

const createAuthor = {
  body: Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string().custom(password).required(),
  }),
};

const getAuthors = {
  query: Joi.object().keys({
    first_name: Joi.string(),
    last_name: Joi.string(),
    username: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getAuthorById = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

const updateAuthorById = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    first_name: Joi.string(),
    last_name: Joi.string(),
    username: Joi.string(),
    email: Joi.string().email(),
  }),
};

const deleteAuthor = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  getAuthors,
  getAuthorById,
  createAuthor,
  deleteAuthor,
  updateAuthorById,
};
