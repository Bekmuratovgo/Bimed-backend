const mongoose = require("mongoose");
const config = require("config");

/**************************************************************
    NFPR -> Not Found Product Request
  **************************************************
    a collection to store the requests comming from users
    requesting regarding products not found on the website
**************************************************************/

const nfprSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, max: 200, min: 1 },
    phone: { type: String, required: true, max: 15, min: 4 },
    product: { type: String, required: true, max: 500, min: 1 },
    status: {
      type: String,
      required: true,
      enum: ["found", "not-found"],
      default: "not-found"
    }
  },
  {
    timestamps: true
  }
);

nfprSchema.methods.toJSON = function() {
  const nfpr = this;
  const nfprObject = nfpr.toObject();
  return nfprObject;
};

// nfprSchema.plugin(require("mongoose-autopopulate"));

const NFPR = mongoose.models.NFPR || mongoose.model("NFPR", nfprSchema);

module.exports = NFPR;
