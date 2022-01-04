/********************************
  Order Controller
********************************/

const BaseController = require("./base.controller");
const { OrderModel } = require("../models");

const {
  handleApiError,
  handleApiSuccess,
  getInputValidationResults,
  checkValidityOfFieldsToBeUpdated,
} = require("../lib");

class Order extends BaseController {
  constructor() {
    super();
    this.model = OrderModel;

    this.create = this.create.bind(this);
    this.getById = this.getById.bind(this);
    this.get = this.get.bind(this);
    this.updateById = this.updateById.bind(this);
    this.deleteById = this.deleteById.bind(this);
    this.delete = this.delete.bind(this);
  }

  /********************************
    create order
  ********************************/

  async create(req, res) {
    try {
      getInputValidationResults(req, res);
      const orderData = req.body;
      const order = await this.model.create(orderData);
      handleApiSuccess(res, 201, "order successfully created", order);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    get order by id
  ********************************/

  async getById(req, res) {
    try {
      const id = req.params.id;
      const order = await this.model.getById(id);
      handleApiSuccess(res, 200, "order successfully retrieved", order);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    get matching orders
  ********************************/

  async get(req, res) {
    try {
      // prevent retreiveing history for non-authorized clients
      if (req.user._id != req.query.buyer)
        handleApiError(
          res,
          403,
          "you are not authorized to access these records"
        );
      const orders = await this.model.get(req);
      handleApiSuccess(res, 200, "orders successfully retrieved", orders);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    update order by id
  ********************************/

  async updateById(req, res) {
    try {
      // validate requested updates
      const validUpdates = ["items", "price"];

      checkValidityOfFieldsToBeUpdated({ body: req.body, validUpdates });

      const order = await this.model.updateById(req);
      handleApiSuccess(res, 200, "order successfully updated", order);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    delete order by id
  ********************************/

  async deleteById(req, res) {
    try {
      const id = req.params.id;

      const order = await this.model.deleteById(id);
      handleApiSuccess(res, 200, "order successfully deleted", order);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    delete maching orders
  ********************************/

  async delete(req, res) {
    try {
      const orders = await this.model.delete(req.query);
      handleApiSuccess(res, 200, "orders successfully deleted", orders);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }
}

module.exports = Order;
