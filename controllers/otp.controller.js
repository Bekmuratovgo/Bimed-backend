/********************************
  Otp Controller
********************************/

const { UserCollection, OTPCollection } = require("../collections");
const { UserModel } = require("../models");

const {
  genSmsOtp,
  sendSmsOtp,
  handleApiError,
  handleApiSuccess,
  getInputValidationResults
} = require("../lib");

class Otp {
  constructor() {
    this.sendSmsOTP = this.sendSmsOTP.bind(this);
  }

  /********************************
    sendSmsOtp
  ********************************/

  async sendSmsOTP(req, res) {
    try {
      getInputValidationResults(req, res);
      const {
        body: { phone, sms_otp_type },
        path
      } = req;

      // get the current time
      const now = Date.now();
      // calculate the expiration date +2 minutes
      const sms_otp_expiration = now + 2 * 60 * 1000;
      // generate the otp
      const sms_otp = genSmsOtp();
      // new otp object: sms otp, expiration date, type, and status
      const new_otp = {
        sms_otp,
        sms_otp_type,
        sms_otp_expiration,
        sms_otp_status: "SENT"
      };

      // send the otp code to the user's phone
      await sendSmsOtp({ phone, otp: sms_otp });

      // add a new otp reccord for the user if it does not exist
      let user = await OTPCollection.findOne({ phone });
      if (!user) {
        user = new OTPCollection({ phone, otp: [new_otp] });
        await user.save();
      } else {
        // remove expired sms otp codes and add the new otp reccord
        // for pending otp : if expiration passed 4 minutes delete it
        user.otp = [
          ...user.otp.filter(
            o =>
              o.sms_otp_expiration > now ||
              (o.sms_otp_status === "PENDING" &&
                Date.now() - o.sms_otp_expiration == 1000 * 60 * 4)
          ),
          { ...new_otp }
        ];
        // save the new data to the user otp collection in database
        await user.save();
      }

      // get the objectId of the newly added otp
      const {
        _id,
        sms_otp_type: otp_type,
        sms_otp_expiration: otp_expiration
      } = user.otp.filter(o => o.sms_otp === sms_otp)[0];

      handleApiSuccess(res, 200, "sms otp code sent successfully", {
        phone,
        sms_otp_id: String(_id),
        sms_otp_type: otp_type,
        sms_otp_expiration: otp_expiration
      });
    } catch (error) {
      handleApiError(res, 500, error.message);
    }
  }

  /********************************
    confirm otp code
  ********************************/

  async confirmSmsOTP(req, res) {
    try {
      getInputValidationResults(req, res);
      const { sms_otp, phone } = req.body;
      const user = await OTPCollection.findOne({
        phone,
        "otp.sms_otp": sms_otp
      });
      if (!user)
        return handleApiError(
          res,
          400,
          "invalid sms otp code or wrong phone number"
        );

      // get the exact otp confirmed
      const confirmedOTP = user.otp.filter(o => o.sms_otp === sms_otp)[0];
      if (confirmedOTP.sms_otp_type === "UPDATE_PHONE") {
        confirmedOTP.sms_otp_status = "PENDING";
      } else {
        confirmedOTP.sms_otp_status = "CONFIRMED";
      }

      // check if otp is expired
      // for pending otp : if expiration passed 4 minutes delete it
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
        if (o.sms_otp == sms_otp) exists = true;
      }
      if (!exists) throw new Error("it seems sms otp code has expired");

      // const { _id } = user.otp.filter(o => o.sms_otp === sms_otp)[0];

      handleApiSuccess(res, 200, "sms otp code confirmed successfully", {});
    } catch (error) {
      handleApiError(res, 400, error.message);
    }
  }
}

module.exports = Otp;
