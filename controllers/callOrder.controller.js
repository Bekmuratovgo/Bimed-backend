/********************************
  CallOrder Controller
********************************/

const BaseController = require("./base.controller");
const { CallOrderModel } = require("../models");

const {
  handleApiError,
  handleApiSuccess,
  getInputValidationResults,
  checkValidityOfFieldsToBeUpdated
} = require("../lib");

class CallOrder extends BaseController {
  constructor() {
    super();
    this.model = CallOrderModel;

    this.create = this.create.bind(this);
    this.getById = this.getById.bind(this);
    this.get = this.get.bind(this);
    this.updateById = this.updateById.bind(this);
    this.deleteById = this.deleteById.bind(this);
    this.delete = this.delete.bind(this);
  }

  /********************************
    create callOrder
  ********************************/

  async create(req, res) {
    try {
      getInputValidationResults(req, res);
      const callOrderData = req.body;
      const callOrder = await this.model.create(callOrderData);
      handleApiSuccess(
        res,
        201,
        "'call order' successfully created",
        callOrder
      );
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    get callOrder by id
  ********************************/

  async getById(req, res) {
    try {
      const id = req.params.id;
      const callOrder = await this.model.getById(id);
      handleApiSuccess(
        res,
        200,
        "'call order' successfully retrieved",
        callOrder
      );
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    get matching callOrders
  ********************************/

  async get(req, res) {
    try {
      const callOrders = await this.model.get(req.query);
      handleApiSuccess(
        res,
        200,
        "'call orders' successfully retrieved",
        callOrders
      );
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    update callOrder by id
  ********************************/

  async updateById(req, res) {
    try {
      // validate requested updates
      const validUpdates = ["name", "phone"];

      checkValidityOfFieldsToBeUpdated({ body: req.body, validUpdates });

      const callOrder = await this.model.updateById(req);
      handleApiSuccess(
        res,
        200,
        "'call order' successfully updated",
        callOrder
      );
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    delete callOrder by id
  ********************************/

  async deleteById(req, res) {
    try {
      const id = req.params.id;

      const callOrder = await this.model.deleteById(id);
      handleApiSuccess(
        res,
        200,
        "'call order' successfully deleted",
        callOrder
      );
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    delete maching callOrders
  ********************************/

  async delete(req, res) {
    try {
      const callOrders = await this.model.delete(req.query);
      handleApiSuccess(
        res,
        200,
        "'call orders' successfully deleted",
        callOrders
      );
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }
}

module.exports = CallOrder;
