/********************************
  User API
********************************/

const multer = require("multer");
const api = require("express").Router();

const { UserController } = require("../../controllers");
const { UserValidator, auth, uploader, confirmSmsOtp } = require("../../lib");

const {
  create,
  getById,
  updateById,
  deleteById,
  getProfilePhotoByName,
  deleteProfilePhotoByName
} = new UserController();

const {
  validateSignUpInputs: vSUI,
  validateUpdateInputs: vUI
} = new UserValidator();

api.post("/", [vSUI(), confirmSmsOtp], create);
api.get("/:id", [auth], getById);
api.patch("/:id", [auth, vUI(), uploader("user.photo")], updateById);
api.delete("/:id", [auth], deleteById);
api.get("/:id/profile/photo/:key", [auth], getProfilePhotoByName);
api.delete("/:id/profile/photo/:key", [auth], deleteProfilePhotoByName);

module.exports = api;
