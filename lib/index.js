/********************************

  Lib:
  - functions that handle certain situations like errors and are used in different parts of the application

  List (total count: 8):
  - utils
  - loggers
  - modules
  - helpers
  - services
  - handlers
  - templates
  - validators
  - middleware

********************************/

const utils = require("./utils");
const workers = require("./workers");
const loggers = require("./loggers");
const modules = require("./modules");
const helpers = require("./helpers");
const services = require("./services");
const handlers = require("./handlers");
const templates = require("./templates");
const validators = require("./validators");
const middleware = require("./middleware");

module.exports = {
  utils,
  workers,
  loggers,
  modules,
  helpers,
  services,
  handlers,
  templates,
  validators,
  middleware,

  ...utils,
  ...workers,
  ...loggers,
  ...modules,
  ...helpers,
  ...services,
  ...handlers,
  ...templates,
  ...validators,
  ...middleware
};
