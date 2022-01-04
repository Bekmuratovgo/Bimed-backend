/********************************

  Validators:
  -

  List of validators (total count: 10):
  - otp
  - base
  - auth
  - user
  - nfpr  ->  Not Found Product Request
  - utcar ->  Upgrade To Commercial Account Request
  - order
  - medicine
  - feedback
  - callOrder

********************************/

const OTPValidator = require("./otp.validator");
const BaseValidator = require("./base.validator");
const AuthValidator = require("./auth.validator");
const UserValidator = require("./user.validator");
const NFPRValidator = require("./nfpr.validator");
const UTCARValidator = require("./utcar.validator");
const OrderValidator = require("./order.validator");
const MedicineValidator = require("./medicine.validator");
const FeedbackValidator = require("./feedback.validator");
const CallOrderValidator = require("./callOrder.validator");

const validators = {
  OTPValidator,
  BaseValidator,
  AuthValidator,
  UserValidator,
  NFPRValidator,
  UTCARValidator,
  OrderValidator,
  MedicineValidator,
  FeedbackValidator,
  CallOrderValidator
};
module.exports = { validators, ...validators };
