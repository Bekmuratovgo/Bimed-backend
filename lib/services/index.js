const aws = require("./aws");
const email = require("./email");

module.exports = { aws, email, ...aws, ...email };
