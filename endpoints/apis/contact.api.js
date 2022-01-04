/********************************
  Contact API
********************************/

const api = require("express").Router();

const { ContactController } = require("../../controllers");

const { get, getById } = new ContactController();

api.get("/", get);
api.get("/:id", getById);

module.exports = api;
