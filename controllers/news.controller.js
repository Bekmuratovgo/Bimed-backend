/********************************
  News Controller
********************************/

const BaseController = require("./base.controller");
const { NewsModel } = require("../models");

const {
  handleApiError,
  handleApiSuccess,
  getInputValidationResults,
  checkValidityOfFieldsToBeUpdated,
} = require("../lib");

class News extends BaseController {
  constructor() {
    super();
    this.model = NewsModel;

    this.create = this.create.bind(this);
    this.getById = this.getById.bind(this);
    this.get = this.get.bind(this);
    this.updateById = this.updateById.bind(this);
    this.deleteById = this.deleteById.bind(this);
    this.delete = this.delete.bind(this);
  }

  /********************************
    create news
  ********************************/

  async create(req, res) {
    try {
      getInputValidationResults(req, res);
      const newsData = req.body;
      const news = await this.model.create(newsData);
      handleApiSuccess(res, 201, "news successfully created", news);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    get news by id
  ********************************/

  async getById(req, res) {
    try {
      const id = req.params.id;
      const news = await this.model.getById(id);
      handleApiSuccess(res, 200, "news successfully retrieved", news);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    get matching news
  ********************************/

  async get(req, res) {
    try {
      const news = await this.model.get(req.query);
      handleApiSuccess(res, 200, "news successfully retrieved", news);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    update news by id
  ********************************/

  async updateById(req, res) {
    try {
      // validate requested updates
      const validUpdates = ["title", "body", "image", "date"];

      checkValidityOfFieldsToBeUpdated({ body: req.body, validUpdates });

      const news = await this.model.updateById(req);
      handleApiSuccess(res, 200, "news successfully updated", news);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    delete news by id
  ********************************/

  async deleteById(req, res) {
    try {
      const id = req.params.id;

      const news = await this.model.deleteById(id);
      handleApiSuccess(res, 200, "news successfully deleted", news);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    delete maching news
  ********************************/

  async delete(req, res) {
    try {
      const news = await this.model.delete(req.query);
      handleApiSuccess(res, 200, "news successfully deleted", news);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }
}

module.exports = News;
