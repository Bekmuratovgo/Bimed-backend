// node modules
const { check, body } = require("express-validator");

// base validator
const BaseValidator = require("./base.validator");

/********************************
  UTCAR Validator
********************************/

class UTCAR extends BaseValidator {
  constructor(props) {
    super(props);
    this.validateCreateInputs = this.validateCreateInputs.bind(this);
  }

  /********************************

    validateCreateInputs:
    - Validate the following field' VALUEs before CREATING a utcar .
    - If any of the values in the following fields fails the test bellow, the create will fail.

  ********************************/

  validateCreateInputs() {
    return [
      check("name", "please enter your name")
        .not()
        .isEmpty()
        .isLength({ max: 50 })
        .withMessage("name cannot exceed 50 characters"),

      check("phone", "please enter your phone number")
        .not()
        .isEmpty()
        .isNumeric()
        .withMessage("please enter a valid phone number")
        .isLength({ max: 14, min: 9 })
        .withMessage("please enter a valid phone number")
    ];
  }
}

module.exports = UTCAR;
