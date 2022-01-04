// node modules
const { check, body } = require("express-validator");

// base validator
const BaseValidator = require("./base.validator");

/********************************
  NFPR Validator

  NFPR -> Not Found Product Request
********************************/

class NFPR extends BaseValidator {
  constructor(props) {
    super(props);
    this.validateCreateInputs = this.validateCreateInputs.bind(this);
  }

  /********************************

    validateCreateInputs:
    - Validate the following field' VALUEs before CREATING a nfpr .
    - If any of the values in the following fields fails the test bellow, the create will fail.

  ********************************/

  validateCreateInputs() {
    return [
      check("name", "please enter your name")
        .not()
        .isEmpty()
        .isLength({ max: 100 })
        .withMessage("name cannot exceed 100 characters"),

      check("phone", "please enter your phone number")
        .not()
        .isEmpty()
        .isNumeric()
        .withMessage("please enter a valid phone number")
        .isLength({ max: 14, min: 9 })
        .withMessage("please enter a valid phone number"),

      check(
        "product",
        "please enter the name of the product not found on the website"
      )
        .not()
        .isEmpty()
        .isLength({ max: 150 })
        .withMessage("product name can NOT exceed 100 characters")
    ];
  }
}

module.exports = NFPR;
