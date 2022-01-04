const mongoose = require("mongoose");
const config = require("config");

const otpSchema = new mongoose.Schema(
  {
    phone: { type: String, unique: true, required: true },
    otp: [
      {
        sms_otp: {
          type: String,
          required: true
        },
        sms_otp_type: {
          type: String,
          enum: ["LOGIN", "CREATE_USER", "UPDATE_PHONE"],
          required: true
        },
        sms_otp_status: {
          type: String,
          enum: ["SENT", "CONFIRMED", "PENDING", "VERIFIED"],
          required: true
        },
        sms_otp_expiration: {
          type: Date,
          required: true
        },
        date: {
          type: Date,
          default: Date.now()
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

otpSchema.methods.toJSON = function() {
  const otp = this;
  const otpObject = otp.toObject();
  return otpObject;
};

// otpSchema.plugin(require("mongoose-autopopulate"));

const OTP = mongoose.models.OTP || mongoose.model("OTP", otpSchema);

module.exports = OTP;
