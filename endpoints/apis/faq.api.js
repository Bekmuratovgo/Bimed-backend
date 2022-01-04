/********************************
  FAQ API
********************************/

const api = require("express").Router();

const { FAQController } = require("../../controllers");

const { get, getById } = new FAQController();

api.get("/", get);
api.get("/:id", getById);

module.exports = api;
