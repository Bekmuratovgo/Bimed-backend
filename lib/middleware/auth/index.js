/********************************
  auth middleware
********************************/

const jwt = require("jsonwebtoken");
const config = require("config");

const { UserCollection, OTPCollection } = require("../../../collections");

const { handleApiError } = require("../../handlers");

/********************************
  auth middleware function
********************************/

const auth = async (req, res, next) => {
  try {
    const token = await req.header("x-auth-token");
    if (!token) {
      return handleApiError(res, 401, "you are not authenticated");
    }

    const verified = await jwt.verify(token, config.get("secret"));
    if (!verified || !Object.keys(verified).includes("user"))
      return handleApiError(res, 401, "you are not authenticated");

    const {
      user: { id, account_type }
    } = verified;

    const user = await UserCollection.findOne({
      _id: id,
      "tokens.token": token
    });

    if (user) {
      req.token = token;
      req.user = user;
      next();
    } else {
      return handleApiError(res, 404, "user not found or token doesn't exist");
    }
  } catch (error) {
    handleApiError(res, 400, error.message);
  }
};

/********************************
  sms otp code middleware function
********************************/

const confirmSmsOtp = async (req, res, next) => {
  try {
    const { sms_otp, phone } = req.body;
    const user = await OTPCollection.findOne({ phone, "otp.sms_otp": sms_otp });
    if (!user)
      return handleApiError(
        res,
        400,
        "invalid sms otp code or wrong phone number"
      );
    // check if otp is expired
    const validOTPs = user.otp.filter(
      o =>
        o.sms_otp_expiration > Date.now() ||
        (o.sms_otp_status === "PENDING" &&
          Date.now() - o.sms_otp_expiration == 1000 * 60 * 4)
    );
    // update the list of valid sms otp codes
    user.otp = [...validOTPs];
    // save to database
    await user.save();

    let exists = false;
    for (const o of validOTPs) {
      if (o.sms_otp == sms_otp && o.sms_otp_status != "PENDING") exists = true;
    }
    if (exists) next();
    else return handleApiError(res, 400, "it seems sms otp code has expired");
  } catch (error) {
    handleApiError(res, 400, error.message);
  }
};

module.exports = { auth, confirmSmsOtp };
