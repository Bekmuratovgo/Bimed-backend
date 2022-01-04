/********************************
  NFPR API
********************************/

const multer = require("multer");
const api = require("express").Router();

const { NFPRController } = require("../../controllers");
const { NFPRValidator } = require("../../lib");

const { create, get } = new NFPRController();

const { validateCreateInputs: vCI } = new NFPRValidator();

api.post("/", [vCI()], create);
// api.get("/", get); // for testing ONLY

module.exports = api;
