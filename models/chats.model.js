const mongoose = require("mongoose");

const chatsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Messages",
    },
  ],
});

module.exports = mongoose.model("Chats", chatsSchema);
