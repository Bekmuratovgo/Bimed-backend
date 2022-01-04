/********************************
  About API
********************************/

const api = require("express").Router();

const { AboutController } = require("../../controllers");

const { get, getById } = new AboutController();

api.get("/", get);
api.get("/:id", getById);

module.exports = api;
