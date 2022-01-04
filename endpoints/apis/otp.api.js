/********************************
  OTP API
********************************/

const api = require("express").Router();

const { OTPController } = require("../../controllers");
const { OTPValidator } = require("../../lib");
const { sendSmsOTP, confirmSmsOTP } = new OTPController();

const {
  validateSendSmsOtpInputs: vSSOI,
  validateConfirmSmsOtpInputs: vCSOI
} = new OTPValidator();

api.post("/sendSmsOtp", [vSSOI()], sendSmsOTP);
api.post("/confirmSmsOtp", [vCSOI()], confirmSmsOTP);

module.exports = api;
