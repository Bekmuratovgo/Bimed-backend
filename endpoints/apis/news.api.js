/********************************
  News API
********************************/

const api = require("express").Router();

const { NewsController } = require("../../controllers");

const { get, getById } = new NewsController();

api.get("/", get);
api.get("/:id", getById);

module.exports = api;
