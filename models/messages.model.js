const mongoose = require("mongoose");

const messagesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  message: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Messages",
    },
  ],
  date: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Messages", messagesSchema);
