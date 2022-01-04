/********************************
  Contact Controller
********************************/

const BaseController = require("./base.controller");
const { ContactModel } = require("../models");

const {
  handleApiError,
  handleApiSuccess,
  getInputValidationResults,
  checkValidityOfFieldsToBeUpdated,
} = require("../lib");

class Contact extends BaseController {
  constructor() {
    super();
    this.model = ContactModel;

    this.create = this.create.bind(this);
    this.getById = this.getById.bind(this);
    this.get = this.get.bind(this);
    this.updateById = this.updateById.bind(this);
    this.deleteById = this.deleteById.bind(this);
    this.delete = this.delete.bind(this);
  }

  /********************************
    create contact
  ********************************/

  async create(req, res) {
    try {
      getInputValidationResults(req, res);
      const contactData = req.body;
      const contact = await this.model.create(contactData);
      handleApiSuccess(res, 201, "contact successfully created", contact);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    get contact by id
  ********************************/

  async getById(req, res) {
    try {
      const id = req.params.id;
      const contact = await this.model.getById(id);
      handleApiSuccess(res, 200, "contact successfully retrieved", contact);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    get matching contacts
  ********************************/

  async get(req, res) {
    try {
      const contacts = await this.model.get(req.query);
      handleApiSuccess(res, 200, "contacts successfully retrieved", contacts);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    update contact by id
  ********************************/

  async updateById(req, res) {
    try {
      // validate requested updates
      const validUpdates = ["field", "data"];

      checkValidityOfFieldsToBeUpdated({ body: req.body, validUpdates });

      const contact = await this.model.updateById(req);
      handleApiSuccess(res, 200, "contact successfully updated", contact);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    delete contact by id
  ********************************/

  async deleteById(req, res) {
    try {
      const id = req.params.id;

      const contact = await this.model.deleteById(id);
      handleApiSuccess(res, 200, "contact successfully deleted", contact);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    delete maching contacts
  ********************************/

  async delete(req, res) {
    try {
      const contacts = await this.model.delete(req.query);
      handleApiSuccess(res, 200, "contacts successfully deleted", contacts);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }
}

module.exports = Contact;
