/********************************
  About Controller
********************************/

const BaseController = require("./base.controller");
const { AboutModel } = require("../models");

const {
  handleApiError,
  handleApiSuccess,
  getInputValidationResults,
  checkValidityOfFieldsToBeUpdated,
} = require("../lib");

class About extends BaseController {
  constructor() {
    super();
    this.model = AboutModel;

    this.create = this.create.bind(this);
    this.getById = this.getById.bind(this);
    this.get = this.get.bind(this);
    this.updateById = this.updateById.bind(this);
    this.deleteById = this.deleteById.bind(this);
    this.delete = this.delete.bind(this);
  }

  /********************************
    create about
  ********************************/

  async create(req, res) {
    try {
      getInputValidationResults(req, res);
      const aboutData = req.body;
      const about = await this.model.create(aboutData);
      handleApiSuccess(res, 201, "about successfully created", about);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    get about by id
  ********************************/

  async getById(req, res) {
    try {
      const id = req.params.id;
      const about = await this.model.getById(id);
      handleApiSuccess(res, 200, "about successfully retrieved", about);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    get matching abouts
  ********************************/

  async get(req, res) {
    try {
      const abouts = await this.model.get(req.query);
      handleApiSuccess(res, 200, "abouts successfully retrieved", abouts);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    update about by id
  ********************************/

  async updateById(req, res) {
    try {
      // validate requested updates
      const validUpdates = ["title", "body", "gallery"];

      checkValidityOfFieldsToBeUpdated({ body: req.body, validUpdates });

      const about = await this.model.updateById(req);
      handleApiSuccess(res, 200, "about successfully updated", about);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    delete about by id
  ********************************/

  async deleteById(req, res) {
    try {
      const id = req.params.id;

      const about = await this.model.deleteById(id);
      handleApiSuccess(res, 200, "about successfully deleted", about);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    delete maching abouts
  ********************************/

  async delete(req, res) {
    try {
      const abouts = await this.model.delete(req.query);
      handleApiSuccess(res, 200, "abouts successfully deleted", abouts);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }
}

module.exports = About;
