const mongoose = require("mongoose");

const GestureSchema = new mongoose.Schema({
  _id: Number,
  love: Number,
  like: Number,
  dislike: Number,
});

const GestureModel = mongoose.model("gestures", GestureSchema);
module.exports = GestureModel;
