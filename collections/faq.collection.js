const mongoose = require("mongoose");
const config = require("config");

const faqSchema = new mongoose.Schema(
  {
    title: { type: String, max: 500, min: 1 },
    body: { type: String, max: 5000, min: 1 }
  },
  {
    timestamps: true
  }
);

faqSchema.methods.toJSON = function() {
  const faq = this;
  const faqObject = faq.toObject();
  return faqObject;
};

// faqSchema.plugin(require("mongoose-autopopulate"));

const FAQ = mongoose.models.FAQ || mongoose.model("FAQ", faqSchema);

module.exports = FAQ;
