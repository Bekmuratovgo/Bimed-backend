/********************************

  Middleware:
  -

  List of middlewares (total count: 0):
  -

********************************/

const upload = require("./upload");
const auth = require("./auth");

const middleware = { ...upload, ...auth };

module.exports = { middleware, ...middleware };
