const ThoughtsSchema = require("../models/thoughts.model");
const UsersSchema = require("../models/users.model");

exports.getAllThoughts = async (req, res) => {
  let thoughts;
  try {
    thoughts = await ThoughtsSchema.find().populate(
      "username",
      "-password -_id -Thoughts -Comments -email -__v"
    );
    res.status(200).json(thoughts);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

exports.createThought = async (req, res) => {
  const thoughtText = req.body.thoughtText;
  let thought;
  console.log(req.user.username);
  try {
    obj = await UsersSchema.findOne({ username: req.user.username });

    thought = new ThoughtsSchema({
      username: obj["_id"],
      thoughtText: thoughtText,
    });

    const newThought = thought.save();
    res.status(200).json(newThought);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

exports.getMyThoughts = async (req, res) => {
  console.log(req.user);
  let userId;
  await UsersSchema.findOne({ username: req.user.username }, (err, obj) => {
    userId = obj["_id"];
  });
  console.log(userId);
  const thoughts = await ThoughtsSchema.find({
    username: userId,
  }).populate();
  console.log(thoughts);
};
