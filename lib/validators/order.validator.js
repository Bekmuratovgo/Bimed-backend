// node modules
const { check, body } = require("express-validator");

// base validator
const BaseValidator = require("./base.validator");

/********************************
  Order Validator
********************************/

class Order extends BaseValidator {
  constructor(props) {
    super(props);
    this.validateOrderFeilds = this.validateOrderFeilds.bind(this);
  }

  /********************************

    validateOrderFeilds:
    - Validate the following field' VALUEs before UPDATING a order account.
    - If any of the values in the following fields fails the test bellow, the order cannot be created.

  ********************************/

  validateOrderFeilds() {
    return [
      check("items", "please select items/medicines to buy")
        .not()
        .isEmpty()
        .custom((value, { req }) => {
          if (!(Array.isArray(value) && value.length > 0)) {
            throw new Error("please select items/medicines to buy");
          }
          return true;
        }),

      check("buyer", "please append buyer's id to the order").not().isEmpty(),

      check("price", "please enter price").not().isEmpty().isLength({
        max: 25,
      }),
    ];
  }
}

module.exports = Order;
