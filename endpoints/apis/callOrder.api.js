/********************************
  CallOrder API
********************************/

const multer = require("multer");
const api = require("express").Router();

const { CallOrderController } = require("../../controllers");
const { CallOrderValidator } = require("../../lib");

const { create, get } = new CallOrderController();

const { validateCreateInputs: vCI } = new CallOrderValidator();

api.post("/", [vCI()], create);
// api.get("/", get); // for testing ONLY

module.exports = api;
