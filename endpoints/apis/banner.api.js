/********************************
  Banner API
********************************/

const api = require("express").Router();

const { BannerController } = require("../../controllers");

const { get, getById } = new BannerController();

api.get("/", get);
api.get("/:id", getById);

module.exports = api;
