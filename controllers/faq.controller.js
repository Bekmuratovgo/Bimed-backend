/********************************
  FAQ Controller
********************************/

const BaseController = require("./base.controller");
const { FAQModel } = require("../models");

const {
  handleApiError,
  handleApiSuccess,
  getInputValidationResults,
  checkValidityOfFieldsToBeUpdated,
} = require("../lib");

class FAQ extends BaseController {
  constructor() {
    super();
    this.model = FAQModel;

    this.create = this.create.bind(this);
    this.getById = this.getById.bind(this);
    this.get = this.get.bind(this);
    this.updateById = this.updateById.bind(this);
    this.deleteById = this.deleteById.bind(this);
    this.delete = this.delete.bind(this);
  }

  /********************************
    create faq
  ********************************/

  async create(req, res) {
    try {
      getInputValidationResults(req, res);
      const faqData = req.body;
      const faq = await this.model.create(faqData);
      handleApiSuccess(res, 201, "faq successfully created", faq);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    get faq by id
  ********************************/

  async getById(req, res) {
    try {
      const id = req.params.id;
      const faq = await this.model.getById(id);
      handleApiSuccess(res, 200, "faq successfully retrieved", faq);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    get matching faqs
  ********************************/

  async get(req, res) {
    try {
      const faqs = await this.model.get(req.query);
      handleApiSuccess(res, 200, "faqs successfully retrieved", faqs);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    update faq by id
  ********************************/

  async updateById(req, res) {
    try {
      // validate requested updates
      const validUpdates = ["title", "body"];

      checkValidityOfFieldsToBeUpdated({ body: req.body, validUpdates });

      const faq = await this.model.updateById(req);
      handleApiSuccess(res, 200, "faq successfully updated", faq);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    delete faq by id
  ********************************/

  async deleteById(req, res) {
    try {
      const id = req.params.id;

      const faq = await this.model.deleteById(id);
      handleApiSuccess(res, 200, "faq successfully deleted", faq);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    delete maching faqs
  ********************************/

  async delete(req, res) {
    try {
      const faqs = await this.model.delete(req.query);
      handleApiSuccess(res, 200, "faqs successfully deleted", faqs);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }
}

module.exports = FAQ;
