/********************************

  this collection is for clients/customers ' accounts

  Note: kept the naming as 'user' in order NOT to expose distinction on the client-side

********************************/

const config = require("config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const { refer } = require("./utils");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: false
    },
    phone: {
      type: String,
      required: true,
      unique: true
    },

    date_of_birth: { type: Date, required: true },
    bonus: {
      type: Number,
      default: 0,
      min: 0
    },
    favorite_medicines: [{ ...refer("Medicine") }],
    account_type: {
      type: String,
      enum: ["commercial", "non-commercial"],
      required: true,
      default: "non-commercial"
    },
    profile_photo: {
      type: Object
    },
    frozen: {
      type: Boolean,
      default: false
    },
    tokens: [
      {
        token: {
          type: String,
          required: false
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

userSchema.methods.toJSON = function() {
  const user = this;
  const userObj = user.toObject();
  delete userObj.password;

  return userObj;
};

userSchema.methods.genAuthToken = async function() {
  const user = this;
  const payload = {
    user: {
      id: user._id.toString(),
      account_type: user.account_type
    }
  };
  const token = await jwt.sign(payload, config.get("secret"), {
    expiresIn: "1 day"
  });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (phone, email, password) => {
  const user = await User.findOne({ phone });
  if (!user) {
    throw new Error("invalid credentials");
  }

  return user;
};

// userSchema.plugin(require("mongoose-autopopulate"));

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
