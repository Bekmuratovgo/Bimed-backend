// node modules
const { check, body } = require("express-validator");

// base validator
const BaseValidator = require("./base.validator");

/********************************
  Medicine Validator
********************************/

class Medicine extends BaseValidator {
  constructor(props) {
    super(props);
    this.validateUpdateInputs = this.validateUpdateInputs.bind(this);
  }

  /********************************

    validateUpdateInputs:
    - Validate the following field' VALUEs before UPDATING a medicine.
    - If any of the values in the following fields fails the test bellow, the update will fail.

  ********************************/

  validateUpdateInputs() {
    return [
      check("name", "please enter name").isLength({
        max: 25,
      }),

      check("price", "please enter price").isLength({
        max: 25,
      }),
    ];
  }
}

module.exports = Medicine;
