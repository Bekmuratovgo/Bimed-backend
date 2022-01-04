const mongoose = require("mongoose");
const config = require("config");

const contactSchema = new mongoose.Schema(
  {
    field: { type: String, max: 200, min: 1 },
    data: { type: String, max: 400, min: 1 }
  },
  {
    timestamps: true
  }
);

contactSchema.methods.toJSON = function() {
  const contact = this;
  const contactObject = contact.toObject();
  return contactObject;
};

// contactSchema.plugin(require("mongoose-autopopulate"));

const Contact =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);

module.exports = Contact;
