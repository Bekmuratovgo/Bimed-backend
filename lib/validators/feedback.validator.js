// node modules
const { check, body } = require("express-validator");

// base validator
const BaseValidator = require("./base.validator");

/********************************
  Feedback Validator
********************************/

class Feedback extends BaseValidator {
  constructor(props) {
    super(props);
    this.validateCreateInputs = this.validateCreateInputs.bind(this);
  }

  /********************************

    validateCreateInputs:
    - Validate the following field' VALUEs before CREATING a feedback .
    - If any of the values in the following fields fails the test bellow, the create will fail.

  ********************************/

  validateCreateInputs() {
    return [
      check("name", "please enter name")
        .not()
        .isEmpty()
        .isLength({ max: 50 })
        .withMessage("name cannot exceed 50 characters"),

      check("phone", "please enter a valid phone number")
        .not()
        .isEmpty()
        .isNumeric()
        .isLength({ max: 14, min: 9 }),

      check("email", "please enter a valid email address")
        .not()
        .isEmpty()
        .isEmail(),

      check("title", "please enter a title")
        .not()
        .isEmpty()
        .isLength({ max: 200 })
        .withMessage("title cannot exceed 200 characters"),

      check("body", "please enter a body")
        .not()
        .isEmpty()
        .isLength({ max: 5000 })
        .withMessage("body cannot exceed 5000 characters"),
    ];
  }
}

module.exports = Feedback;
