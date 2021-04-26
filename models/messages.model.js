const mongoose = require("mongoose");

const messagesSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  body: [
    {
      type: String,
      required: true,
    },
  ],
  date: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Messages", messagesSchema);
