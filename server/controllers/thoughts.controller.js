const ThoughtsSchema = require("../models/thoughts.model");
const UsersSchema = require("../models/users.model");

exports.getAllThoughts = async (req, res) => {
  res.send(200).json("getAllthoughts");
};

exports.createThought = async (req, res) => {
  let thought;
  try {
    await UsersSchema.findOne({ username: req.body.username }, (err, obj) => {
      console.log(obj);
      thought = new ThoughtsSchema({
        username: obj["_id"],
        thoughtText: req.body.thoughtText,
      });
    });

    const newThought = thought.save();
    await UsersSchema.findById(newThought.username).populate("Thoughts");
    res.status(200).json(newThought);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
