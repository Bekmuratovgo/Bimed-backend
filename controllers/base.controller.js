/********************************

  ### The base controller
  - contains basic/isolated methods that handle Database CRUD operations.
  - This module is root/gateway for all Database operations.
  - If customization is needed then it should NOT be performed here. Instead it should be implemented in the context where it is needed.
  - All methods here should be standard and accessible to all the inheriting classes.
  - The naming convention used here is to be somehow close to that of mongoose to avoid confusion.



  ### List of methods (total count: 7):
  - create

  - getById
  - get      -> (filter)

  - updateById
  - update    -> (filter)

  - deleteById
  - delete   -> (filter)

********************************/

const { BaseModel } = require("../models");

const { handleApiSuccess, handleApiError } = require("../lib");

class Base {
  constructor(collection) {
    this.collection = collection;
  }

  async create(req, res) {
    try {
      const item = await BaseModel.create({
        item: req.body,
        collection: this.collection,
      });
      handleApiSuccess(res, 201, "created", item);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  async getById(req, res) {
    try {
      const item = await BaseModel.findById({
        id: req.params.id,
        collection: this.collection,
      });
      handleApiSuccess(res, 200, "retrieved item by id", item);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  async get(req, res) {
    try {
      // TODO: add a query parser
      const items = await BaseModel.findMany({
        filter: req.body.filter, // get has no 'body' !!!
        collection: this.collection,
      });
      handleApiSuccess(res, 200, "retrieved", items);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  async updateById(req, res) {
    try {
      const item = await BaseModel.updateById({
        id: req.params.id,
        data: req.body.data,
        collection: this.collection,
      });
      handleApiSuccess(res, 200, "updated item by id", item);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  async update(req, res) {
    try {
      const items = await BaseModel.updateMany({
        filter: req.body.filter,
        data: req.body.data,
        collection: this.collection,
      });
      handleApiSuccess(res, 200, "updated", items);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  async deleteById(req, res) {
    try {
      const item = await BaseModel.deleteById({
        id: req.params.id,
        data: req.body.data,
        collection: this.collection,
      });
      handleApiSuccess(res, 200, "deleted item by id", item);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  async delete(req, res) {
    try {
      // TODO: add a query parser
      const items = await BaseModel.deleteMany({
        filter: req.body.filter,
        data: req.body.data,
        collection: this.collection,
      });
      handleApiSuccess(res, 200, "deleted", items);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }
}

module.exports = Base;
