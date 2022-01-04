// node modules
const { check, body } = require("express-validator");
const config = require("config");

// base validator
const BaseValidator = require("./base.validator");

/********************************
  User Validator
********************************/

class User extends BaseValidator {
  constructor(props) {
    super(props);
    this.validateSignUpInputs = this.validateSignUpInputs.bind(this);
    this.validateUpdateInputs = this.validateUpdateInputs.bind(this);
  }

  /********************************

    validateSignUpInputs:
    - Validate the following field' VALUEs before CREATING a user account.
    - If any of the values in the following fields fails the test bellow, the creation will fail.

  ********************************/

  validateSignUpInputs() {
    return [
      check("firstname", "please enter first name")
        .not()
        .isEmpty()
        .isLength({ max: 25 }),

      check("lastname", "please enter last name")
        .not()
        .isEmpty()
        .isLength({ max: 25 }),

      check("phone", "please enter a valid phone number")
        .not()
        .isEmpty()
        .isNumeric()
        .isLength({ max: 14, min: 9 }),

      check("date_of_birth", "please enter a your date of birth")
        .not()
        .isEmpty()
        .isNumeric(),

      check("sms_otp", "please enter sms otp code")
        .not()
        .isEmpty()
    ];
  }

  /********************************

    validateUpdateInputs:
    - Validate the following field' VALUEs before UPDATING a user account.
    - If any of the values in the following fields fails the test bellow, the update will fail.

  ********************************/

  validateUpdateInputs() {
    return [
      check("firstname", "please enter first name").isLength({
        max: 25
      }),

      check("lastname", "please enter last name").isLength({
        max: 25
      }),

      check("email", "please enter a valid email address").isEmail(),

      check("phone", "please enter a valid phone number")
        .isNumeric()
        .isLength({ max: 14, min: 9 })
    ];
  }
}

module.exports = User;
