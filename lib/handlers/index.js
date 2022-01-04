/********************************

  Handlers:
  - functions that handle certain situations like errors and are used in different parts of the application

  List of handlers (total count: 3):
  - handleApiSuccess
  - handleApiError
  - errorHandler

********************************/

const { winLogger } = require("../loggers");

/********************************

  handleApiSuccess:
  - handle the success of an API request.
  - customization params: (statusCode, message, data)

********************************/

const handleApiSuccess = (res, statusCode, message, data) => {
  winLogger.info(
    `[method: "${res.req.method}"] [path: "${res.req.originalUrl ||
      ""}"] [status code: ${statusCode}]  [message: "${message}"]`
  );
  return res.status(statusCode || 200).json({
    message,
    body: Array.isArray(data)
      ? [...data]
      : data._doc
      ? { ...data._doc }
      : { ...data }
  });
};

/********************************

  handleApiError:
  - handle the fail of an API request.
  - customization params: (statusCode, errorMessage:error )

********************************/

const handleApiError = (res, statusCode, error) => {
  winLogger.error(
    `[method: "${res.req.method}"] [path: "${res.req.originalUrl ||
      ""}"] [status code: ${statusCode}]  [error: "${error}"]`
  );
  return res.status(statusCode || 500).json({ error });
};

/********************************

  Naming philosophy choice:
  - using a descriptive adjective in the name 'errorHandler' instead of an action/verb word * like 'handle...' to distinguish usual functions from class declared constructors.

********************************/

class ModalError extends Error {
  constructor(statusCode = 500, message = "unknown error", ...params) {
    super(...params);
    this.name = "ModalError";
    this.statusCode = statusCode; // a custom status code depending on the nature of the error
    this.message = message; // a custom messsage to be passed
    this.date = Date.now(); // a timestamp of when the error occurred
  }
}

const errorHandler = ModalError;

const handlers = { handleApiSuccess, handleApiError, errorHandler };

module.exports = { handlers, ...handlers };
