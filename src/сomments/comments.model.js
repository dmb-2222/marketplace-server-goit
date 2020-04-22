const mongoose = require("mongoose");
const { Schema } = mongoose;

const userComments = new Schema({
  product: { type: String, required: true },
  author: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  mark: {
    type: String,
    required: true,
  },
});

const commentsModel = mongoose.model("Comments", userComments);

module.exports = commentsModel;
