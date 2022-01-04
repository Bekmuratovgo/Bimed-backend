const mongoose = require("mongoose");
const config = require("config");

const aboutSchema = new mongoose.Schema(
  {
    title: { type: String, max: 500, min: 1 },
    body: { type: String, max: 5000, min: 1 },
    gallery: [{ type: Object }]
  },
  {
    timestamps: true
  }
);

aboutSchema.methods.toJSON = function() {
  const about = this;
  const aboutObject = about.toObject();
  return aboutObject;
};

// aboutSchema.plugin(require("mongoose-autopopulate"));

const About = mongoose.models.About || mongoose.model("About", aboutSchema);

module.exports = About;
