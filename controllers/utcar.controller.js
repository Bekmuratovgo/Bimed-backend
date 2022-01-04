/********************************
  UTCAR Controller
********************************/

const BaseController = require("./base.controller");
const { UTCARModel } = require("../models");
const {
  utcar: { sendEmails }
} = require("./utils");

const {
  handleApiError,
  handleApiSuccess,
  getInputValidationResults,
  checkValidityOfFieldsToBeUpdated
} = require("../lib");

class UTCAR extends BaseController {
  constructor() {
    super();
    this.model = UTCARModel;

    this.create = this.create.bind(this);
    this.getById = this.getById.bind(this);
    this.get = this.get.bind(this);
    this.updateById = this.updateById.bind(this);
    this.deleteById = this.deleteById.bind(this);
    this.delete = this.delete.bind(this);
  }

  /********************************
    create utcar
  ********************************/

  async create(req, res) {
    try {
      getInputValidationResults(req, res);
      const utcarData = req.body;
      const utcar = await this.model.create(req);
      await sendEmails(utcar);

      handleApiSuccess(
        res,
        201,
        "'Upgrade To Commercial Account Request' successfully created",
        utcar
      );
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    get utcar by id
  ********************************/

  async getById(req, res) {
    try {
      const id = req.params.id;
      const utcar = await this.model.getById(id);
      handleApiSuccess(
        res,
        200,
        "'Upgrade To Commercial Account Request' successfully retrieved",
        utcar
      );
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    get matching utcars
  ********************************/

  async get(req, res) {
    try {
      const utcars = await this.model.get(req.query);
      handleApiSuccess(
        res,
        200,
        "'Upgrade To Commercial Account Requests' successfully retrieved",
        utcars
      );
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    update utcar by id
  ********************************/

  async updateById(req, res) {
    try {
      // validate requested updates
      const validUpdates = ["name", "phone", "license"];

      checkValidityOfFieldsToBeUpdated({ body: req.body, validUpdates });

      const utcar = await this.model.updateById(req);
      handleApiSuccess(
        res,
        200,
        "'Upgrade To Commercial Account Request' successfully updated",
        utcar
      );
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    delete utcar by id
  ********************************/

  async deleteById(req, res) {
    try {
      const id = req.params.id;

      const utcar = await this.model.deleteById(id);
      handleApiSuccess(
        res,
        200,
        "'Upgrade To Commercial Account Request' successfully deleted",
        utcar
      );
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    delete maching utcars
  ********************************/

  async delete(req, res) {
    try {
      const utcars = await this.model.delete(req.query);
      handleApiSuccess(
        res,
        200,
        "'Upgrade To Commercial Account Requests' successfully deleted",
        utcars
      );
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }
}

module.exports = UTCAR;
