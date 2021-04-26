const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
  commentAuthor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  thought: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Thoughts",
  },
  commentText: {
    type: String,
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Comments", commentsSchema);
