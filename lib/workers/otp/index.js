/********************************
    OTP workers
********************************/

const { OTPCollection } = require("../../../collections");
const { winLogger } = require("../../loggers");

const cleanOTPCollection = async () => {
  winLogger.info(`starting cleanOTPCollection worker ...`);
  var cleaningInterval;
  try {
    const interval = 1000 * 60 * 5;
    cleaningInterval = setInterval(async () => {
      const users = await OTPCollection.find({});
      let otps = [];
      users.forEach(u => (otps = [...otps, ...u.otp]));
      // console.log(otps);
      if (otps.length > 0) {
        // map otps to users
        // clean the expired ones
      }
    }, interval);
    // console.log("...............", otpsp);
  } catch (error) {
    clearInterval(cleaningInterval);
    winLogger.error(`error in cleanOTPCollection worker: [ ${error.message} ]`);
    throw new Error(`error in cleanOTPCollection worker: [ ${error.message} ]`);
  }
};

module.exports = { cleanOTPCollection };
