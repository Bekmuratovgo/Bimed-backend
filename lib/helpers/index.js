/********************************

  Helpers:
  - functions that help in certain situations and are used in different parts of the application.

  List of helpers (total count: 2):
  - getInputValidationResults
  - checkValidityOfFieldsToBeUpdated

********************************/

// node modules
const axios = require("axios");
const nikita = require("config").get("nikita");
const { validationResult } = require("express-validator");

// local modules
const { toXML } = require("./to-xml");

// handlers
const {
  errorHandler,
  handleApiSuccess,
  handleApiError,
} = require("../handlers");

/********************************

  getInputValidationResults:
  - retreives the results of the input validations ran when creating or updating an entity in the database.

********************************/

const getInputValidationResults = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new errorHandler(400, `${errors.array()[0].msg}`);
  }
};

/********************************

  checkValidityOfFieldsToBeUpdated:
  - Validate the following FIELDs before UPDATING a user account.
  - If a field other than the ones specified below is submitted with the request, the update will fail.
  - This is for security: to prevent user from tampring with data they shouldn't alter.

********************************/

const checkValidityOfFieldsToBeUpdated = ({ body, validUpdates }) => {
  const updates = Object.keys(body);
  const isValidUpdate = updates.every((update) =>
    validUpdates.includes(update)
  );
  if (!isValidUpdate) {
    throw new Error("you are NOT allowed to update these fields");
  }
};

/********************************
  generate sms otp code for authentication
  returns a string of a 6-digit integer whole number with NO fractions
********************************/

const genSmsOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(10);
};

/********************************
  send sms otp code for authentication to the given phone number
********************************/

const sendSmsOtp = async ({ phone, otp }) => {
  try {
    const data = {
      message: {
        id: otp,
        login: nikita.login,
        pwd: nikita.password,
        sender: nikita.sender,
        text: `your code is ${otp}`,
        phones: [{ phone }],
        test: 0,
      },
    };
    const body = toXML(data, null, 2);
    const res = await axios({
      url: nikita.url,
      method: "post",
      headers: { "Content-Type": "application/xml" },
      data: body,
    });

    return {};
  } catch (error) {
    throw new errorHandler(
      500,
      `unable to send sms otp code to phone ${phone} because: ${error.message}`
    );
  }
};

const helpers = {
  genSmsOtp,
  sendSmsOtp,
  getInputValidationResults,
  checkValidityOfFieldsToBeUpdated,
};
module.exports = {
  helpers,
  ...helpers,
};
