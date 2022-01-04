const mongoose = require("mongoose");
const config = require("config");

const callOrderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, max: 200, min: 2 },
    phone: { type: String, requierd: true, max: 15, min: 4 }
  },
  {
    timestamps: true
  }
);

callOrderSchema.methods.toJSON = function() {
  const callOrder = this;
  const callOrderObject = callOrder.toObject();
  return callOrderObject;
};

// callOrderSchema.plugin(require("mongoose-autopopulate"));

const CallOrder =
  mongoose.models.CallOrder || mongoose.model("CallOrder", callOrderSchema);

module.exports = CallOrder;
