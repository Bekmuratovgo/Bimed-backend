/********************************

  Controllers:
  -

  List of controllers (total count: 16):
  - otp
  - faq
  - news
  - base
  - auth
  - user
  - order
  - nfpr  ->  Not Found Product Request
  - utcar ->  Upgrade To Commercial Account Request
  - about
  - banner
  - contact
  - medicine
  - pharmacy
  - feedback
  - callOrder

********************************/

const OTPController = require("./otp.controller");
const FAQController = require("./faq.controller");
const NewsController = require("./news.controller");
const NFPRController = require("./nfpr.controller");
const BaseController = require("./base.controller");
const AuthController = require("./auth.controller");
const UserController = require("./user.controller");
const OrderController = require("./order.controller");
const UTCARController = require("./utcar.controller");
const AboutController = require("./about.controller");
const BannerController = require("./banner.controller");
const ContactController = require("./contact.controller");
const MedicineController = require("./medicine.controller");
const PharmacyController = require("./pharmacy.controller");
const FeedbackController = require("./feedback.controller");
const CallOrderController = require("./callOrder.controller");

module.exports = {
  OTPController,
  FAQController,
  NewsController,
  NFPRController,
  BaseController,
  AuthController,
  UserController,
  OrderController,
  UTCARController,
  AboutController,
  BannerController,
  ContactController,
  MedicineController,
  PharmacyController,
  FeedbackController,
  CallOrderController
};
