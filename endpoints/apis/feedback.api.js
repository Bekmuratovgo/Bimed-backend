/********************************
  Feedback API
********************************/

const multer = require("multer");
const api = require("express").Router();

const { FeedbackController } = require("../../controllers");
const { FeedbackValidator } = require("../../lib");

const { create, get } = new FeedbackController();

const { validateCreateInputs: vCI } = new FeedbackValidator();

api.post("/", [vCI()], create);
// api.get("/", get); // for testing ONLY

module.exports = api;
