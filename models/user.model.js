/********************************
  User Model
********************************/

const { errorHandler, downloadFile, deleteFile } = require("../lib");
const { UserCollection } = require("../collections");
const {
  user: { handlePhoneNumberChange, handleProfilePhotoChange }
} = require("./utils");
const BaseModel = require("./base.model");

const collection = UserCollection;

class User extends BaseModel {
  constructor() {}

  /********************************
    create user
  ********************************/

  static async create(userData) {
    try {
      const { phone } = userData;

      // extra ensurance for phone number
      if (!phone)
        throw new errorHandler(400, "a phone number must be included");

      const phoneExists = await super.findOne({
        filter: { phone },
        collection
      });

      //  if the phone belongs to another user not self
      if (phoneExists)
        throw new errorHandler(
          400,
          `this phone: ${phone} cannot be used, please use a different one`
        );

      const user = await super.create({
        item: {
          ...userData,
          role: "user"
        },
        collection
      });

      return user;
    } catch (error) {
      throw new errorHandler(error.statusCode, error.message);
    }
  }

  /********************************
    get user by id
  ********************************/

  static async getById(id) {
    try {
      return await super.findById({ id, collection });
    } catch (error) {
      throw new errorHandler(error.statusCode, error.message);
    }
  }

  /********************************
    get matching users
  ********************************/

  static async get(query) {
    try {
      const {
        limit = undefined,
        skip = undefined,

        firstname = undefined,
        lastname = undefined,
        email = undefined,
        phone = undefined,
        date_of_birth = undefined,
        account_type = undefined,

        sortBy = undefined
      } = query;

      // / /  / / / //  / /////
      const sort = {};
      if (sortBy) {
        const parts = sortBy.split(":");
        sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
      }
      // / /  / / / //  / /////
      const filter = {};
      const filterOptions = [
        "firstname",
        "lastname",
        "email",
        "phone",
        "date_of_birth",
        "account_type"
      ];
      filterOptions.forEach(filterOption => {
        if (query[filterOption]) filter[filterOption] = query[filterOption];
      });
      // / /  / / / //  / /////
      const restricted = "-password ";
      // / /  / / / //  / /////
      const options = {
        limit: limit && parseInt(limit),
        skip: limit && parseInt(skip),
        sort
      };
      // / /  / / / //  / /////
      const users = await super.findMany({
        filter,
        restricted,
        options,
        collection
      });
      if (!users) {
        throw new errorHandler(500, "FETCH selected users => Failed");
      } else if (!(users.length > 0)) {
        return [];
      }
      return users;
    } catch (error) {
      throw new errorHandler(error.statusCode, error.message);
    }
  }

  /********************************
      get profile photo
  ********************************/

  static async getProfilePhoto(req, res) {
    try {
      // ****************************************************************
      // compare the key to the filename on the user's profile_photo object
      // ****************************************************************

      const filename = req.params.key;
      if (req.user.profile_photo.filename != filename) {
        throw new errorHandler(
          403,
          "you are not authorized to access this file"
        );
      }
      await downloadFile({ req, res, filename });
    } catch (error) {
      throw new errorHandler(error.statusCode, error.message);
    }
  }

  /********************************
      delete profile photo
  ********************************/

  static async deleteProfilePhoto(req, res) {
    try {
      // ****************************************************************
      // compare the key to the filename on the user's profile_photo object
      // ****************************************************************

      // console.log(req.params);

      const { id, key: filename } = req.params;
      if (req.user.profile_photo.filename != filename) {
        throw new errorHandler(
          403,
          "you are not authorized to delete this file"
        );
      }
      // detele file from bucket
      await deleteFile({ req, filename });
      // delete file data from db
      return super.updateById({
        id,
        data: { profile_photo: {} },
        collection
      });
    } catch (error) {
      throw new errorHandler(error.statusCode, error.message);
    }
  }

  /********************************
    update user by id
  ********************************/

  static async updateById(req) {
    try {
      const {
        body: { profile_photo, sms_otp_old_id, sms_otp_new_id, email, phone },
        params: { id }
      } = req;

      if (email) {
        const emailExists = await super.findOne({
          filter: { email },
          collection
        });

        //  if the email belongs to another user not self
        if (emailExists && emailExists._id != id)
          throw new errorHandler(
            400,
            `this email: ${email} cannot be used, please use a different one`
          );
      }

      if (phone) {
        const phoneExists = await super.findOne({
          filter: { phone },
          collection
        });

        //  if the phone belongs to another user not self
        if (phoneExists && phoneExists._id != id)
          throw new errorHandler(
            400,
            `this phone: ${phone} cannot be used, please use a different one`
          );

        if (!phoneExists) await handlePhoneNumberChange(req);
      }

      if (req.file) {
        const new_profile_photo = await handleProfilePhotoChange(req);
        req.body.profile_photo = new_profile_photo;
      }

      // clean the body before making the update
      if (sms_otp_old_id) delete req.body.sms_otp_old_id;
      if (sms_otp_new_id) delete req.body.sms_otp_new_id;

      // update user account
      const user = await super.updateById({
        id,
        data: { ...req.body },
        collection
      });
      if (!user)
        throw new errorHandler(500, `UPDATE user with the id: ${id} => Failed`);

      return user;
    } catch (error) {
      throw new errorHandler(error.statusCode, error.message);
    }
  }

  /********************************
    delete user by id
  ********************************/

  static async deleteById(id) {
    try {
      return await super.deleteOne({
        filter: { _id: id },
        collection
      });
    } catch (e) {
      throw new errorHandler(error.statusCode, error.message);
    }
  }

  /********************************
    delete maching users
  ********************************/

  static async delete(query) {
    const {
      limit = undefined,
      skip = undefined,

      firstname = undefined,
      lastname = undefined,
      email = undefined,
      phone = undefined,
      date_of_birth = undefined,
      account_type = undefined,

      sortBy = undefined
    } = query;

    // / /  / / / //  / /////
    const sort = {};
    if (sortBy) {
      const parts = sortBy.split(":");
      sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
    }
    // / /  / / / //  / /////
    const filter = {};
    const filterOptions = [
      "firstname",
      "lastname",
      "email",
      "phone",
      "date_of_birth",
      "account_type"
    ];
    filterOptions.forEach(filterOption => {
      if (query[filterOption]) filter[filterOption] = query[filterOption];
    });
    // / /  / / / //  / /////
    const options = {
      limit: limit && parseInt(limit),
      skip: limit && parseInt(skip),
      sort
    };
    // / /  / / / //  / /////
    const users = await super.deleteMany({
      filter,
      options,
      collection
    });
    if (!users) {
      throw new errorHandler(500, "DELETE selected users => Failed");
    } else if (!(users.length > 0)) {
      throw new errorHandler(404, "No users to delete");
    }

    return users;
  }

  //
}

module.exports = User;
