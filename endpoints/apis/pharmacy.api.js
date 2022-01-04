/********************************
  Pharmacy API
********************************/

const api = require("express").Router();

const { PharmacyController } = require("../../controllers");

const { get, getById, updateById } = new PharmacyController();

api.get("/", get);
api.get("/:id", getById);

module.exports = api;
