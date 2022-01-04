/********************************
  Banner Controller
********************************/

const BaseController = require("./base.controller");
const { BannerModel } = require("../models");

const {
  handleApiError,
  handleApiSuccess,
  getInputValidationResults,
  checkValidityOfFieldsToBeUpdated,
} = require("../lib");

class Banner extends BaseController {
  constructor() {
    super();
    this.model = BannerModel;

    this.create = this.create.bind(this);
    this.getById = this.getById.bind(this);
    this.get = this.get.bind(this);
    this.updateById = this.updateById.bind(this);
    this.deleteById = this.deleteById.bind(this);
    this.delete = this.delete.bind(this);
  }

  /********************************
    create banner
  ********************************/

  async create(req, res) {
    try {
      getInputValidationResults(req, res);
      const bannerData = req.body;
      const banner = await this.model.create(bannerData);
      handleApiSuccess(res, 201, "banner successfully created", banner);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    get banner by id
  ********************************/

  async getById(req, res) {
    try {
      const id = req.params.id;
      const banner = await this.model.getById(id);
      handleApiSuccess(res, 200, "banner successfully retrieved", banner);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    get matching banners
  ********************************/

  async get(req, res) {
    try {
      const banners = await this.model.get(req.query);
      handleApiSuccess(res, 200, "banners successfully retrieved", banners);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    update banner by id
  ********************************/

  async updateById(req, res) {
    try {
      // validate requested updates
      const validUpdates = [
        "name",
        "banner",
        "details",
        "clicks",
        "description",
      ];

      checkValidityOfFieldsToBeUpdated({ body: req.body, validUpdates });

      const banner = await this.model.updateById(req);
      handleApiSuccess(res, 200, "banner successfully updated", banner);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    delete banner by id
  ********************************/

  async deleteById(req, res) {
    try {
      const id = req.params.id;

      const banner = await this.model.deleteById(id);
      handleApiSuccess(res, 200, "banner successfully deleted", banner);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    delete maching banners
  ********************************/

  async delete(req, res) {
    try {
      const banners = await this.model.delete(req.query);
      handleApiSuccess(res, 200, "banners successfully deleted", banners);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }
}

module.exports = Banner;
