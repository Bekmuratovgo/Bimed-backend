/********************************
  Workers
********************************/

const otpWorkers = require("./otp");

module.exports = { otpWorkers, ...otpWorkers };
