const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  img: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Images",
  },
  Thoughts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thoughts",
    },
  ],
  Comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

module.exports = mongoose.model("Users", usersSchema);
