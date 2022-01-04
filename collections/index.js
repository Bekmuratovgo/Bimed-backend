/********************************

  Collections:
  -

  List of collections (total count: 14):
  - otp
  - user
  - order
  - medicine
  - faq
  - news
  - nfpr  ->  Not Found Product Request
  - utcar ->  Upgrade To Commercial Account Request
  - about
  - banner
  - contact
  - pharmacy
  - feedback
  - callOrder

********************************/

const OTPCollection = require("./otp.collection");
const UserCollection = require("./user.collection");
const OrderCollection = require("./order.collection");
const MedicineCollection = require("./medicine.collection");

// home page
const FAQCollection = require("./faq.collection");
const NewsCollection = require("./news.collection");
const NFPRCollection = require("./nfpr.collection");
const UTCARCollection = require("./utcar.collection");
const AboutCollection = require("./about.collection");
const BannerCollection = require("./banner.collection");
const ContactCollection = require("./contact.collection");
const PharmacyCollection = require("./pharmacy.collection");
const FeedbackCollection = require("./feedback.collection");
const CallOrderCollection = require("./callOrder.collection");

const collections = {
  FAQCollection,
  OTPCollection,
  NewsCollection,
  NFPRCollection,
  UserCollection,
  OrderCollection,
  UTCARCollection,
  AboutCollection,
  BannerCollection,
  ContactCollection,
  PharmacyCollection,
  MedicineCollection,
  FeedbackCollection,
  CallOrderCollection
};

module.exports = { collections, ...collections };
