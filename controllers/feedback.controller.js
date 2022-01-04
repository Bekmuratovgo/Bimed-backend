/********************************
  Feedback Controller
********************************/

const BaseController = require("./base.controller");
const { FeedbackModel } = require("../models");

const {
  handleApiError,
  handleApiSuccess,
  getInputValidationResults,
  checkValidityOfFieldsToBeUpdated,
} = require("../lib");

class Feedback extends BaseController {
  constructor() {
    super();
    this.model = FeedbackModel;

    this.create = this.create.bind(this);
    this.getById = this.getById.bind(this);
    this.get = this.get.bind(this);
    this.updateById = this.updateById.bind(this);
    this.deleteById = this.deleteById.bind(this);
    this.delete = this.delete.bind(this);
  }

  /********************************
    create feedback
  ********************************/

  async create(req, res) {
    try {
      getInputValidationResults(req, res);
      const feedbackData = req.body;
      const feedback = await this.model.create(feedbackData);
      handleApiSuccess(res, 201, "feedback successfully created", feedback);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    get feedback by id
  ********************************/

  async getById(req, res) {
    try {
      const id = req.params.id;
      const feedback = await this.model.getById(id);
      handleApiSuccess(res, 200, "feedback successfully retrieved", feedback);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    get matching feedbacks
  ********************************/

  async get(req, res) {
    try {
      const feedbacks = await this.model.get(req.query);
      handleApiSuccess(res, 200, "feedbacks successfully retrieved", feedbacks);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    update feedback by id
  ********************************/

  async updateById(req, res) {
    try {
      // validate requested updates
      const validUpdates = ["name", "phone", "email", "title", "body"];

      checkValidityOfFieldsToBeUpdated({ body: req.body, validUpdates });

      const feedback = await this.model.updateById(req);
      handleApiSuccess(res, 200, "feedback successfully updated", feedback);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    delete feedback by id
  ********************************/

  async deleteById(req, res) {
    try {
      const id = req.params.id;

      const feedback = await this.model.deleteById(id);
      handleApiSuccess(res, 200, "feedback successfully deleted", feedback);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    delete maching feedbacks
  ********************************/

  async delete(req, res) {
    try {
      const feedbacks = await this.model.delete(req.query);
      handleApiSuccess(res, 200, "feedbacks successfully deleted", feedbacks);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }
}

module.exports = Feedback;
