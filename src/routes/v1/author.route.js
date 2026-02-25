const express = require("express");
const router = express.Router();
const { validate, auth } = require("../../middlewares");
const { authorValidations } = require("../../validations");
const { authorController } = require("../../controllers");
router
  .route("/")
  .get(validate(authorValidations.getAuthors), authorController.getAuthors)
  .post(
    validate(authorValidations.createAuthor),
    authorController.createAuthor
  );
router
  .route("/:id")
  .get(
    auth.isAuthenticated,
    validate(authorValidations.getAuthorById),
    authorController.getAuthorById
  )
  .patch(
    auth.isAuthenticated,
    validate(authorValidations.updateAuthorById),
    authorController.updateAuthorById
  )
  .delete(
    auth.isAuthenticated,
    validate(authorValidations.deleteAuthor),
    authorController.deleteAuthor
  );

module.exports = router;
