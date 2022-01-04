/********************************
  Pharmacy Controller
********************************/

const BaseController = require("./base.controller");
const { PharmacyModel } = require("../models");

const {
  handleApiError,
  handleApiSuccess,
  getInputValidationResults,
  checkValidityOfFieldsToBeUpdated,
} = require("../lib");

class Pharmacy extends BaseController {
  constructor() {
    super();
    this.model = PharmacyModel;

    this.create = this.create.bind(this);
    this.getById = this.getById.bind(this);
    this.get = this.get.bind(this);
    this.updateById = this.updateById.bind(this);
    this.deleteById = this.deleteById.bind(this);
    this.delete = this.delete.bind(this);
  }

  /********************************
    create pharmacy
  ********************************/

  async create(req, res) {
    try {
      getInputValidationResults(req, res);
      const pharmacyData = req.body;
      const pharmacy = await this.model.create(pharmacyData);
      handleApiSuccess(res, 201, "pharmacy successfully created", pharmacy);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    get pharmacy by id
  ********************************/

  async getById(req, res) {
    try {
      const id = req.params.id;
      const pharmacy = await this.model.getById(id);
      handleApiSuccess(res, 200, "pharmacy successfully retrieved", pharmacy);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    get matching pharmacies
  ********************************/

  async get(req, res) {
    try {
      const pharmacies = await this.model.get(req.query);
      handleApiSuccess(
        res,
        200,
        "pharmacies successfully retrieved",
        pharmacies
      );
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    update pharmacy by id
  ********************************/

  async updateById(req, res) {
    try {
      // validate requested updates
      const validUpdates = [
        "name",
        "address",
        "contacts",
        "schedule",
        "coordinates",
      ];

      checkValidityOfFieldsToBeUpdated({ body: req.body, validUpdates });

      const pharmacy = await this.model.updateById(req);
      handleApiSuccess(res, 200, "pharmacy successfully updated", pharmacy);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    delete pharmacy by id
  ********************************/

  async deleteById(req, res) {
    try {
      const id = req.params.id;

      const pharmacy = await this.model.deleteById(id);
      handleApiSuccess(res, 200, "pharmacy successfully deleted", pharmacy);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    delete maching pharmacies
  ********************************/

  async delete(req, res) {
    try {
      const pharmacies = await this.model.delete(req.query);
      handleApiSuccess(res, 200, "pharmacies successfully deleted", pharmacy);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }
}

module.exports = Pharmacy;
