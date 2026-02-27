const Joi = require("joi");
const { objectId } = require("./custom.validations.js");

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
  deleteAuthor,
  updateAuthorById,
};
