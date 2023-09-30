const { body, validationResult } = require("express-validator");

exports.registerValidationRules = [
  body("username")
    .isLength({ min: 5, max: 20 })
    .withMessage(
      "username must be at least 5 characters long and at most 20 characters long"
    ),
  body("email").isEmail().withMessage("Incorrect email format."),
  body("password")
    .notEmpty()
    .isStrongPassword({
      minSymbols: 0,
      minNumbers: 0,
    })
    .withMessage("Password must be at least 8 characters long"),
  body("fistName")
    .optional()
    .isLength({
      min: 3,
      max: 20,
    })
    .withMessage(
      "Fist name must be at least 3 characters long and at most 20 characters long"
    ),
  body("lastName")
    .optional()
    .isLength({
      min: 3,
      max: 20,
    })
    .withMessage(
      "Last name must be at least 3 characters long and at most 20 characters long"
    ),
  body("phoneNumber")
    .isMobilePhone("id-ID")
    .withMessage("Invalid phone number."),
];

exports.applyRegisterValidation = [
  (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(400).json({
        ok: false,
        message: "failed data validation broo!!",
        errors: result.errors,
      });
      return;
    }
    next();
  },
];
