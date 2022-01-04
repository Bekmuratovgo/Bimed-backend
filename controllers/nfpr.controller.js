/********************************
  NFPR Controller
********************************/

const BaseController = require("./base.controller");
const { NFPRModel } = require("../models");

const {
  handleApiError,
  handleApiSuccess,
  getInputValidationResults,
  checkValidityOfFieldsToBeUpdated
} = require("../lib");

class NFPR extends BaseController {
  constructor() {
    super();
    this.model = NFPRModel;

    this.create = this.create.bind(this);
    this.getById = this.getById.bind(this);
    this.get = this.get.bind(this);
    this.updateById = this.updateById.bind(this);
    this.deleteById = this.deleteById.bind(this);
    this.delete = this.delete.bind(this);
  }

  /********************************
    create nfpr
  ********************************/

  async create(req, res) {
    try {
      getInputValidationResults(req, res);
      const nfprData = req.body;
      const nfpr = await this.model.create(nfprData);
      handleApiSuccess(
        res,
        201,
        "'Not Found Product Request' successfully created",
        nfpr
      );
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    get nfpr by id
  ********************************/

  async getById(req, res) {
    try {
      const id = req.params.id;
      const nfpr = await this.model.getById(id);
      handleApiSuccess(
        res,
        200,
        "'Not Found Product Request' successfully retrieved",
        nfpr
      );
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    get matching nfprs
  ********************************/

  async get(req, res) {
    try {
      const nfprs = await this.model.get(req.query);
      handleApiSuccess(
        res,
        200,
        "'Not Found Product Requests' successfully retrieved",
        nfprs
      );
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    update nfpr by id
  ********************************/

  async updateById(req, res) {
    try {
      // validate requested updates
      const validUpdates = ["name", "phone", "product", "status"];

      checkValidityOfFieldsToBeUpdated({ body: req.body, validUpdates });

      const nfpr = await this.model.updateById(req);
      handleApiSuccess(
        res,
        200,
        "'Not Found Product Request' successfully updated",
        nfpr
      );
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    delete nfpr by id
  ********************************/

  async deleteById(req, res) {
    try {
      const id = req.params.id;

      const nfpr = await this.model.deleteById(id);
      handleApiSuccess(
        res,
        200,
        "'Not Found Product Request' successfully deleted",
        nfpr
      );
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    delete maching nfprs
  ********************************/

  async delete(req, res) {
    try {
      const nfprs = await this.model.delete(req.query);
      handleApiSuccess(
        res,
        200,
        "'Not Found Product Requests' successfully deleted",
        nfprs
      );
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }
}

module.exports = NFPR;
