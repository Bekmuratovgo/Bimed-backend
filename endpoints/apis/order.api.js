/********************************
  Pharmacy API
********************************/

const api = require("express").Router();

const { PharmacyController } = require("../../controllers");
const { OrderValidator } = require("../../lib");

const { create, get, getById } = new PharmacyController();

const { validateOrderFeilds: vOF } = new OrderValidator();

api.post("/", [vOF()], create);
api.get("/:id", getById);
api.get("/", get);

module.exports = api;
