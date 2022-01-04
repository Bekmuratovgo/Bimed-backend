const mongoose = require("mongoose");
const config = require("config");

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, max: 500, min: 1 },
    body: { type: String, max: 5000, min: 1 },
    image: { type: Object },
    date: { type: Date }
  },
  {
    timestamps: true
  }
);

newsSchema.methods.toJSON = function() {
  const news = this;
  const newsObject = news.toObject();
  return newsObject;
};

// newsSchema.plugin(require("mongoose-autopopulate"));

const News = mongoose.models.News || mongoose.model("News", newsSchema);

module.exports = News;
