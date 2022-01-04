const mongoose = require("mongoose");
const config = require("config");

const bannerSchema = new mongoose.Schema(
  {
    name: { type: String, max: 500 },
    banner: { type: Object },
    details: { type: Object },
    clicks: { type: Number },
    description: { type: String }
  },
  {
    timestamps: true
  }
);

bannerSchema.methods.toJSON = function() {
  const banner = this;
  const bannerObject = banner.toObject();
  return bannerObject;
};

// bannerSchema.plugin(require("mongoose-autopopulate"));

const Banner = mongoose.models.Banner || mongoose.model("Banner", bannerSchema);

module.exports = Banner;
