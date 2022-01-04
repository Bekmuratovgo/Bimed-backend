/********************************
  user utils
********************************/
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const {
  winLogger,
  errorHandler,
  uploadFile,
  deleteFile
} = require("../../lib");
const { UserCollection, OTPCollection } = require("../../collections");

const ObjectId = mongoose.Types.ObjectId;

/********************************
  handlePhoneNumberChange
********************************/

const handlePhoneNumberChange = async req => {
  try {
    /********************

      # execution logic:

        1. if the old phone otp id or the new phone otp id does NOT exist, throw an error

        2. if the two id/s are the same, throw an error

        3. find the docment in the collection for both otp/s

        4. if either of the documents is not found in the OTP db collection, throw an error

        5. if found that both docs/otps actually belong to the same phone number, throe an error

        6. remove the old and the new otp records from their respective documents in db

          * if not deleted now, they will be deleted automatically after 4 minutes of their expiration date

        7. save changes to db and return


    ********************/

    const {
      body: { sms_otp_old_id = undefined, sms_otp_new_id = undefined, phone }
    } = req;

    const oldPhoneOtpId = sms_otp_old_id;
    const newPhoneOtpId = sms_otp_new_id;

    if (!oldPhoneOtpId || !newPhoneOtpId)
      throw new errorHandler(
        400,
        "please enter both the id/s of the otp/s used to confirm old and new phone numbers"
      );
    if (oldPhoneOtpId == newPhoneOtpId) {
      throw new errorHandler(
        400,
        "please enter valid id/s of the otp/s used to confirm old and new phone numbers"
      );
    }

    // get the otp of the old phone number and new number
    const oldPhone = await OTPCollection.findOne({
      "otp._id": ObjectId(String(oldPhoneOtpId))
    });
    const newPhone = await OTPCollection.findOne({
      "otp._id": ObjectId(String(newPhoneOtpId))
    });

    if (!oldPhone) {
      throw new errorHandler(
        400,
        `an sms otp code for the OLD phone does not exist for the id: '${oldPhoneOtpId}' `
      );
    }
    if (!newPhone) {
      throw new errorHandler(
        400,
        `an sms otp code for the NEW phone does not exist for the id: '${newPhoneOtpId}' `
      );
    }

    if (oldPhone.phone == newPhone.phone) {
      throw new errorHandler(400, "both id/s belong to the same phone");
    }

    const oldOTPs = oldPhone.otp.filter(
      o => String(o._id) !== String(oldPhoneOtpId)
    );
    const newOTPs = newPhone.otp.filter(
      o => String(o._id) !== String(newPhoneOtpId)
    );

    oldPhone.otp = [...oldOTPs];
    newPhone.otp = [...newOTPs];

    await oldPhone.save();
    await newPhone.save();

    return;
  } catch (error) {
    throw new errorHandler(error.statusCode, error.message);
  }
};

/********************************
  handleProfilePhotoChange
********************************/

const handleProfilePhotoChange = async req => {
  try {
    /***********************************************************

      //  remove the existing photo from the bucket
      //  upload the new photo to the bucket
      //  remove the uploaded photo from the server
      //  remove the existing photo from the database and save the new
          photo data in the database

    ***********************************************************/

    // 1. remove the existing photo from the bucket if exists
    const { filename } = req.user.profile_photo;
    if (filename) await deleteFile({ req, filename });

    // 2. upload the new photo to the bucket
    const uploadedFile = await uploadFile(req);

    // 3. remove the uploaded photo from the server
    const filePath = req.file.path;
    const src = path.resolve(__dirname, "..", "..", `${filePath}`);
    await fs.unlinkSync(src);

    // 4. return the details of the new profile photo to be updated in db
    return { ...req.file, ...uploadedFile };
  } catch (error) {
    throw new errorHandler(error.statusCode, error.message);
  }
};

module.exports = { handlePhoneNumberChange, handleProfilePhotoChange };
