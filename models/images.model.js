const mongoose = require("mongoose");

const imagesSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    unique: true,
  },
  name: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("Images", imagesSchema);
