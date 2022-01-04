const mongoose = require("mongoose");
const config = require("config");

const { refer } = require("./utils");

const orderSchema = new mongoose.Schema(
  {
    name: { type: String },
    items: [{ ...refer("Medicine") }],
    buyer: { ...refer("User") },
    price: { type: Number },
    description: { type: String }
  },
  {
    timestamps: true
  }
);

orderSchema.methods.toJSON = function() {
  const order = this;
  const orderObject = order.toObject();
  return orderObject;
};

orderSchema.plugin(require("mongoose-autopopulate"));

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

module.exports = Order;
