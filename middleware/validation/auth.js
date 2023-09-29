const { body, validationResult } = require("express-validator");

exports.registerValidationRules = [
  body("username")
    .isLength({ min: 5, max: 20 })
    .withMessage("characters must be between 5 and 20 characters"),
  body("email").isEmail().withMessage("invalid email format"),
  body("password")
    .notEmpty()
    .isStrongPassword({
      minSymbols: 0,
      minNumbers: 0,
    })
    .withMessage("password must be at least 8 characters"),
];
