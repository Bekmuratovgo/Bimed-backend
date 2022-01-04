const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const refer = (ref, autopopulate = false, required = false) => ({
  type: ObjectId,
  ref,
  required,
  autopopulate,
});

const dateStamp = {
  date: { type: String },
  time: { type: String },
  raw: { type: Number },
};

module.exports = { refer, dateStamp };
