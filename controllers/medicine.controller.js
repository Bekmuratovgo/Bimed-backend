/********************************
  Medicine Controller
********************************/

const BaseController = require("./base.controller");
const { MedicineModel } = require("../models");

const {
  handleApiError,
  handleApiSuccess,
  getInputValidationResults,
  checkValidityOfFieldsToBeUpdated
} = require("../lib");

class Medicine extends BaseController {
  constructor() {
    super();
    this.model = MedicineModel;

    this.create = this.create.bind(this);
    this.getById = this.getById.bind(this);
    this.get = this.get.bind(this);
    this.getOnSalesById = this.getOnSalesById.bind(this);
    this.getOnSales = this.getOnSales.bind(this);
    this.getTopSellingById = this.getTopSellingById.bind(this);
    this.getTopSelling = this.getTopSelling.bind(this);
    this.updateById = this.updateById.bind(this);
    this.deleteById = this.deleteById.bind(this);
    this.delete = this.delete.bind(this);
    this.getMedicineImageByName = this.getMedicineImageByName.bind(this);
  }

  /********************************
    create medicine
  ********************************/

  async create(req, res) {
    try {
      getInputValidationResults(req, res);
      const medicineData = req.body;
      const medicine = await this.model.create(medicineData);
      handleApiSuccess(res, 201, "medicine successfully created", medicine);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    get medicine by id
  ********************************/

  async getById(req, res) {
    try {
      const id = req.params.id;
      const medicine = await this.model.getById(id);
      handleApiSuccess(res, 200, "medicine successfully retrieved", medicine);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    get matching medicines
  ********************************/

  async get(req, res) {
    try {
      const medicines = await this.model.get(req.query);
      handleApiSuccess(res, 200, "medicines successfully retrieved", medicines);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    get on sales medicine by id
  ********************************/

  async getOnSalesById(req, res) {
    try {
      const id = req.params.id;

      /***********

        // TODO:
        # connect to '1C' when available to retrieve the mdicine

      ************/

      const medicine = {};
      handleApiSuccess(
        res,
        200,
        "an on sales medicine successfully retrieved",
        medicine
      );
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /**************************************
    get matching on sales medicines
  ***************************************/

  async getOnSales(req, res) {
    try {
      //
      /***********

        // TODO:
        # connect to '1C' when available to retrieve the mdicines

      ************/

      const medicines = [{}, {}, {}, {}, {}, {}];
      handleApiSuccess(
        res,
        200,
        "on sales medicines successfully retrieved",
        medicines
      );
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    get top selling medicine by id
  ********************************/

  async getTopSellingById(req, res) {
    try {
      const id = req.params.id;

      /***********

        // TODO:
        # connect to '1C' when available to retrieve the mdicine

      ************/

      const medicine = {};
      handleApiSuccess(
        res,
        200,
        "a top selling medicine successfully retrieved",
        medicine
      );
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /**************************************
    get matching top selling medicines
  ***************************************/

  async getTopSelling(req, res) {
    try {
      //
      /***********

        // TODO:
        # connect to '1C' when available to retrieve the medicines

      ************/

      const medicines = await this.model.getRandomDocuments(3);
      handleApiSuccess(
        res,
        200,
        "top selling medicines successfully retrieved",
        medicines
      );
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    update medicine image by name
  ********************************/

  async getMedicineImageByName(req, res) {
    try {
      await this.model.getMedicineImage(req, res);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    update medicine by id
  ********************************/

  async updateById(req, res) {
    try {
      // validate requested updates
      const validUpdates = [
        "name",
        "price",
        "category",
        "subcategory",
        "country",
        "brand",
        "company",
        "gallery",
        "sales",
        "composition",
        "instructions",
        "description"
      ];

      checkValidityOfFieldsToBeUpdated({ body: req.body, validUpdates });

      const medicine = await this.model.updateById(req);
      handleApiSuccess(res, 200, "medicine successfully updated", medicine);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    delete medicine by id
  ********************************/

  async deleteById(req, res) {
    try {
      const id = req.params.id;

      const medicine = await this.model.deleteById(id);
      handleApiSuccess(res, 200, "medicine successfully deleted", medicine);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    delete maching medicines
  ********************************/

  async delete(req, res) {
    try {
      const medicines = await this.model.delete(req.query);
      handleApiSuccess(res, 200, "medicines successfully deleted", medicines);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }
}

module.exports = Medicine;
