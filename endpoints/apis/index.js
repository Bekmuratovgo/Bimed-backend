/********************************

  ALL APP APIs (count: 15):
    - otp
    - faq
    - news
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

const otp = require("./otp.api");
const faq = require("./faq.api");
const news = require("./news.api");
const nfpr = require("./nfpr.api");
const auth = require("./auth.api");
const user = require("./user.api");
const order = require("./order.api");
const utcar = require("./utcar.api");
const about = require("./about.api");
const banner = require("./banner.api");
const contact = require("./contact.api");
const medicine = require("./medicine.api");
const pharmacy = require("./pharmacy.api");
const feedback = require("./feedback.api");
const callOrder = require("./callOrder.api");

module.exports = {
  otp,
  faq,
  news,
  nfpr,
  auth,
  user,
  order,
  utcar,
  about,
  banner,
  contact,
  medicine,
  pharmacy,
  feedback,
  callOrder
};
