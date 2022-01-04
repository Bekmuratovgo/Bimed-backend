// node modules
const { check, body } = require("express-validator");
const config = require("config");

// base validator
const BaseValidator = require("./base.validator");

const { typeOTP } = require("../modules");

/********************************
  Otp Validator
********************************/

class Otp extends BaseValidator {
  constructor(props) {
    super(props);
    this.validateSendSmsOtpInputs = this.validateSendSmsOtpInputs.bind(this);
  }

  /********************************

    validateSendSmsOtpInputs:
    validateConfirmSmsOtpInputs:
    - Validate the following field' VALUEs

  ********************************/

  validateSendSmsOtpInputs() {
    return [
      check("phone", "please enter your phone number")
        .not()
        .isEmpty()
        .isNumeric()
        .withMessage("please enter a valid phone number")
        .isLength({ max: 14, min: 9 })
        .withMessage("please enter a valid phone number"),

      check("sms_otp_type", "please enter your sms otp code type")
        .not()
        .isEmpty()
        .custom((val, { req, location, path }) =>
          Object.keys(typeOTP).includes(val)
        )
        .withMessage("invalid sms otp code type")
    ];
  }

  validateConfirmSmsOtpInputs() {
    return [
      check("phone", "please enter your phone number")
        .not()
        .isEmpty()
        .isNumeric()
        .withMessage("please enter a valid phone number")
        .isLength({ max: 14, min: 9 })
        .withMessage("please enter a valid phone number"),

      check("sms_otp", "please enter your sms otp code")
        .not()
        .isEmpty()
    ];
  }
}

module.exports = Otp;
