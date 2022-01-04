/********************************
  Auth Controller
********************************/

const { UserCollection } = require("../collections");
const { UserModel } = require("../models");

const {
  handleApiError,
  handleApiSuccess,
  getInputValidationResults,
} = require("../lib");

class Auth {
  constructor() {
    this.check = this.check.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.logoutAll = this.logoutAll.bind(this);
  }

  /********************************
    check if a user is logged in
  ********************************/

  async check(req, res) {
    try {
      const { user, token } = req;
      handleApiSuccess(res, 200, "you are logged in", {
        ...user._doc,
        token,
      });
    } catch (error) {
      handleApiError(res, 500, error.message);
    }
  }

  /********************************
    login
  ********************************/

  async login(req, res) {
    try {
      getInputValidationResults(req, res);
      const { email, password, role, phone } = req.body;
      const user = await UserCollection.findByCredentials(
        phone,
        email,
        password
      );
      if (user.frozen)
        return handleApiError(res, 403, "you are not authorized");
      const token = await user.genAuthToken();
      handleApiSuccess(res, 200, "you have successfully logged in", {
        ...user._doc,
        token,
      });
    } catch (error) {
      handleApiError(res, 401, error.message);
    }
  }

  /********************************
      logout
    ********************************/

  async logout(req, res) {
    try {
      req.user.tokens = req.user.tokens.filter(
        (token) => token.token !== req.token
      );
      await req.user.save();
      handleApiSuccess(
        res,
        200,
        "you have successfully logged out from this device",
        {}
      );
    } catch (error) {
      handleApiError(res, 500, error.message);
    }
  }

  /********************************
    logout from all devices
  ********************************/

  async logoutAll(req, res) {
    try {
      req.user.tokens = [];
      await req.user.save();
      handleApiSuccess(
        res,
        200,
        "you have successfully logged out from all devices",
        {}
      );
    } catch (error) {
      handleApiError(res, 500, error.message);
    }
  }
}

module.exports = Auth;
