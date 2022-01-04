/********************************
  User Controller
********************************/

const BaseController = require("./base.controller");
const { UserModel } = require("../models");

const {
  handleApiError,
  handleApiSuccess,
  getInputValidationResults,
  checkValidityOfFieldsToBeUpdated
} = require("../lib");

class User extends BaseController {
  constructor() {
    super();
    this.model = UserModel;

    this.create = this.create.bind(this);
    this.getById = this.getById.bind(this);
    this.get = this.get.bind(this);
    this.updateById = this.updateById.bind(this);
    this.deleteById = this.deleteById.bind(this);
    this.delete = this.delete.bind(this);
    this.getProfilePhotoByName = this.getProfilePhotoByName.bind(this);
    this.deleteProfilePhotoByName = this.deleteProfilePhotoByName.bind(this);
  }

  /********************************
    create user
  ********************************/

  async create(req, res) {
    try {
      // console.log(req.body);
      getInputValidationResults(req, res);
      const userData = req.body;
      const user = await this.model.create(userData);
      const token = await user.genAuthToken();
      handleApiSuccess(res, 201, "user account successfully created", {
        ...user._doc,
        token
      });
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    get user by id
  ********************************/

  async getById(req, res) {
    try {
      const id = req.params.id;
      const user = await this.model.getById(id);
      handleApiSuccess(res, 200, "user successfully retrieved", user);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    get matching users
  ********************************/

  async get(req, res) {
    try {
      const users = await this.model.get(req.query);
      handleApiSuccess(res, 200, "users successfully retrieved", users);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    get profile photo
  ********************************/

  async getProfilePhotoByName(req, res) {
    try {
      await this.model.getProfilePhoto(req, res);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    delete profile photo
  ********************************/

  async deleteProfilePhotoByName(req, res) {
    try {
      const user = await this.model.deleteProfilePhoto(req, res);
      handleApiSuccess(res, 200, "profile photo successfully deleted", user);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    update user by id
  ********************************/

  async updateById(req, res) {
    try {
      // getInputValidationResults(req, res);
      // validate requested updates
      // "account_type" -> removed: admin only can change
      const validUpdates = [
        "email",
        "phone",
        "password",
        "lastname",
        "firstname",
        "sms_otp_old_id",
        "sms_otp_new_id",
        "profile_photo",
        "date_of_birth",
        "favorite_medicines"
      ];

      checkValidityOfFieldsToBeUpdated({ body: req.body, validUpdates });
      const user = await this.model.updateById(req);
      handleApiSuccess(res, 200, "user successfully updated", user);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    delete user by id
  ********************************/

  async deleteById(req, res) {
    try {
      const id = req.params.id;

      const user = await this.model.deleteById(id);
      handleApiSuccess(res, 200, "user successfully deleted", user);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }

  /********************************
    delete maching users
  ********************************/

  async delete(req, res) {
    try {
      const users = await this.model.delete(req.query);
      handleApiSuccess(res, 200, "users successfully deleted", users);
    } catch (error) {
      handleApiError(res, error.statusCode, error.message);
    }
  }
}

module.exports = User;
