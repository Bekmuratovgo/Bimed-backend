// node modules
const { check, body } = require("express-validator");
const config = require("config");

// base validator
const BaseValidator = require("./base.validator");

/********************************
  Auth Validator
********************************/

class Auth extends BaseValidator {
  constructor(props) {
    super(props);
    this.validateSignInInputs = this.validateSignInInputs.bind(this);
  }

  /********************************

    validateSignInInputs:
    - Validate the following field' VALUEs before login user .
    - If any of the values in the following fields fails the test bellow, the creation will fail.

  ********************************/

  validateSignInInputs() {
    return [
      check("phone", "please enter your phone number")
        .not()
        .isEmpty()
        .isNumeric(),

      check("sms_otp", "please enter your sms otp code")
        .not()
        .isEmpty()
    ];
  }
}

module.exports = Auth;
