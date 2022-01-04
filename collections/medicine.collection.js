const mongoose = require("mongoose");
const config = require("config");

const medicineSchema = new mongoose.Schema(
  {
    name: { type: String },
    externalId: { type: String, immutable: true },
    category: { type: String },
    subcategory: { type: String },
    country: { type: String },
    brand: { type: String },
    company: { type: String },
    gallery: [{ type: Object }],
    price: {
      commercial: { type: Number },
      noncommercial: { type: Number }
    },
    sales: {
      commercial: {
        status: { type: Boolean },
        original: { type: Number },
        current: { type: Number }
      },
      noncommercial: {
        status: { type: Boolean },
        original: { type: Number },
        current: { type: Number }
      }
    },
    composition: { type: String },
    description: { type: String },
    instructions: { type: String }
  },
  {
    timestamps: true
  }
);

medicineSchema.methods.toJSON = function() {
  const medicine = this;
  const medicineObject = medicine.toObject();
  return medicineObject;
};

// medicineSchema.plugin(require("mongoose-autopopulate"));

const Medicine =
  mongoose.models.Medicine || mongoose.model("Medicine", medicineSchema);

module.exports = Medicine;
