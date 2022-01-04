/********************************

  Models:
  -

  List of models (total count: 14):
  - faq
  - news
  - base
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

const FAQModel = require("./faq.model");
const NewsModel = require("./news.model");
const NFPRModel = require("./nfpr.model");
const BaseModel = require("./base.model");
const UserModel = require("./user.model");
const OrderModel = require("./order.model");
const UTCARModel = require("./utcar.model");
const AboutModel = require("./about.model");
const BannerModel = require("./banner.model");
const ContactModel = require("./contact.model");
const MedicineModel = require("./medicine.model");
const PharmacyModel = require("./pharmacy.model");
const FeedbackModel = require("./feedback.model");
const CallOrderModel = require("./callOrder.model");

module.exports = {
  FAQModel,
  NewsModel,
  NFPRModel,
  BaseModel,
  UserModel,
  OrderModel,
  UTCARModel,
  AboutModel,
  BannerModel,
  ContactModel,
  MedicineModel,
  PharmacyModel,
  FeedbackModel,
  CallOrderModel
};
