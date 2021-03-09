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

    const newThought = await thought.save();
    console.log(newThought["_id"]);
    obj.Thoughts.push(newThought["_id"]);
    await UsersSchema.updateOne(
      { _id: obj["_id"] },
      { Thoughts: obj.Thoughts }
    );
    res.status(200).json({ msg: "OK" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

exports.getMyThoughts = async (req, res) => {
  userThoughts = await UsersSchema.findOne({
    username: req.user.username,
  }).populate("Thoughts", "-_id -username -__v");
  res.status(200).json(userThoughts);
};
