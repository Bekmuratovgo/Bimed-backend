/********************************
  Medicine API
********************************/

const api = require("express").Router();

const { MedicineController } = require("../../controllers");

const {
  get,
  getById,

  getOnSales,
  getOnSalesById,

  getTopSelling,
  getTopSellingById,

  getMedicineImageByName
} = new MedicineController();

// any medicine
api.get("/", get);
// medicines on sales
api.get("/onSales", getOnSales);
// top selling medicines
api.get("/topSelling/", getTopSelling);

// by id
api.get("/:id", getById);
api.get("/onSales/:id", getOnSalesById);
api.get("/topSelling/:id", getTopSellingById);

api.get("/:id/image/:key", getMedicineImageByName);

module.exports = api;
