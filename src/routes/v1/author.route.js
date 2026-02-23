const express = require("express");
const router = express.Router();
const { validate } = require("../../middlewares");
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
    validate(authorValidations.getAuthorById),
    authorController.getAuthorById
  )
  .patch(
    validate(authorValidations.updateAuthorById),
    authorController.updateAuthorById
  )
  .delete(
    validate(authorValidations.deleteAuthor),
    authorController.deleteAuthor
  );

module.exports = router;
