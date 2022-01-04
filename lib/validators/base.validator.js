const { check, body } = require("express-validator");
const config = require("config");

class Base {
  constructor() {
    this.name = "Base Validator";
  }
}

module.exports = Base;
