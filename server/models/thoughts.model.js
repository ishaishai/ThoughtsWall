const mongoose = require("mongoose");

const thoughtSchema = new mongoose.Schema({
  thoughtAuthor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  thoughtText: {
    type: String,
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments",
    },
  ],
});

module.exports = mongoose.model("Thoughts", thoughtSchema);
