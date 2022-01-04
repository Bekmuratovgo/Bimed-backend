const mongoose = require("mongoose");
const config = require("config");

const feedbackSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, max: 200, min: 2 },
    phone: { type: String, required: true, max: 15, min: 4 },
    email: { type: String },
    title: { type: String, required: true, max: 500, min: 1 },
    body: { type: String, required: true, max: 5000, min: 1 }
  },

  {
    timestamps: true
  }
);

feedbackSchema.methods.toJSON = function() {
  const feedback = this;
  const feedbackObject = feedback.toObject();
  return feedbackObject;
};

// feedbackSchema.plugin(require("mongoose-autopopulate"));

const Feedback =
  mongoose.models.Feedback || mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
