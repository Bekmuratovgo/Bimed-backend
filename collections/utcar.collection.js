const mongoose = require("mongoose");
const config = require("config");

/**************************************************************
    UTCAR -> Upgrade To Commercial Account Request
  **************************************************
    a collection to store the requests comming from users
    requesting to upgrade the status of their accounts from
    a non-commercial to a commercial one
**************************************************************/

const utcarSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    license: { type: Object, required: true }
  },
  {
    timestamps: true
  }
);

utcarSchema.methods.toJSON = function() {
  const utcar = this;
  const utcarObject = utcar.toObject();
  return utcarObject;
};

// utcarSchema.plugin(require("mongoose-autopopulate"));

const UTCAR = mongoose.models.UTCAR || mongoose.model("UTCAR", utcarSchema);

module.exports = UTCAR;
