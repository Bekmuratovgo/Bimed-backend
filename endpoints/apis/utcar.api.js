/********************************
  UTCAR API
********************************/

const multer = require("multer");
const api = require("express").Router();

const { UTCARController } = require("../../controllers");
const { UTCARValidator, uploader } = require("../../lib");

const { create, get } = new UTCARController();

const { validateCreateInputs: vCI } = new UTCARValidator();

api.post("/", [uploader("user.license"), vCI()], create);
// api.get("/", get); // for testing ONLY

module.exports = api;
