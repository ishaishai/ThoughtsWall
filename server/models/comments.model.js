const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  thought: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Thought",
  },
  commentText: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Thoughts", thoughtSchema);
