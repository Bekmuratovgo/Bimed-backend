/********************************
  Auth API
********************************/

const api = require("express").Router();

const { AuthController } = require("../../controllers");
const { AuthValidator, auth, confirmSmsOtp } = require("../../lib");

const { check, login, logout, logoutAll } = new AuthController();
const { validateSignInInputs: vSII } = new AuthValidator();

api.get("/", [auth], check);
api.post("/login", [vSII(), confirmSmsOtp], login);
api.post("/logout", [auth], logout);
api.post("/logout/all", [auth], logoutAll);

module.exports = api;
