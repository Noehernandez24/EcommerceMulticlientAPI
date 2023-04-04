const { check } = require("express-validator")
const validateResult = require("../utils/validate")

const createUserValidator = [
  check("username", "Error with username field")
    .exists()
    .withMessage("The username must exist")
    .notEmpty()
    .withMessage("The username must not be empty")
    .isString()
    .withMessage("The username has the wrong format")
    .isLength({ min: 5, max: 30 })
    .withMessage("The username must have between 6 and 30 characters"),
  check("email", "Error with email field")
    .exists()
    .withMessage("The email must exist")
    .notEmpty()
    .withMessage("The email must not be empty")
    .isEmail()
    .withMessage("The email has the wrong format")
    .isLength({ min: 5, max: 100 })
    .withMessage("The email must have between 6 and 100 characters"),
  check("password", "Error with password field")
    .exists()
    .withMessage("The password must exist")
    .notEmpty()
    .withMessage("The password must not be empty")
    .isString()
    .withMessage("The password has the wrong format"),
  (req, res, next) => {
    validateResult(req, res, next)
  },
]

module.exports = {
  createUserValidator,
}
