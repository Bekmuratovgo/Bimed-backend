const mongoose = require("mongoose");
const config = require("config");

const pharmacySchema = new mongoose.Schema(
  {
    name: { type: String, max: 500, min: 1 },
    address: { type: String, max: 500, min: 1 },
    contacts: [{ type: String, max: 500, min: 1 }],
    schedule: { from: { type: String }, to: { type: String } },
    coordinates: {
      longitude: { type: Number, min: -180, max: 180 },
      latitude: { type: Number, min: -90, max: 90 }
    },
    image: { type: Object }
  },
  {
    timestamps: true
  }
);

pharmacySchema.methods.toJSON = function() {
  const pharmacy = this;
  const pharmacyObject = pharmacy.toObject();
  return pharmacyObject;
};

// pharmacySchema.plugin(require("mongoose-autopopulate"));

const Pharmacy =
  mongoose.models.Pharmacy || mongoose.model("Pharmacy", pharmacySchema);

module.exports = Pharmacy;
