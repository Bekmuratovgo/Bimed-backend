// node modules
const { check, body } = require("express-validator");

// base validator
const BaseValidator = require("./base.validator");

/********************************
  CallOrder Validator
********************************/

class CallOrder extends BaseValidator {
  constructor(props) {
    super(props);
    this.validateCreateInputs = this.validateCreateInputs.bind(this);
  }

  /********************************

    validateCreateInputs:
    - Validate the following field' VALUEs before CREATING a callOrder .
    - If any of the values in the following fields fails the test bellow, the create will fail.

  ********************************/

  validateCreateInputs() {
    return [
      check("name", "please enter your name")
        .not()
        .isEmpty()
        .isLength({ max: 100 })
        .withMessage("name cannot exceed 50 characters"),

      check("phone", "please enter your phone number")
        .not()
        .isEmpty()
        .isNumeric()
        .withMessage("please enter a valid phone number")
        .isLength({ max: 15, min: 4 })
        .withMessage("please enter a valid phone number")
    ];
  }
}

module.exports = CallOrder;
