const ThoughtsSchema = require("../models/thoughts.model");
const UsersSchema = require("../models/users.model");
const { timeSince } = require("../utils/dateParser");
//console.log(timeSince(new Date(Date.now()-aDay))); to get the stamp

exports.getAllThoughts = async (req, res) => {
  let thoughts;
  try {
    thoughts = await ThoughtsSchema.find()
      .populate(
        "thoughtAuthor",
        "-password -_id -Thoughts -Comments -email -__v"
      )
      .lean();
    thoughts = JSON.parse(JSON.stringify(thoughts));

    thoughts.forEach((thought) => {
      thought.date = `${timeSince(thought.date)} ago`;
    });
    console.log(thoughts);
    res.status(200).json(thoughts);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

exports.createThought = async (req, res) => {
  const thoughtText = req.body.thoughtText;
  let thought;
  try {
    obj = await UsersSchema.findOne({ username: req.user.username });

    thought = new ThoughtsSchema({
      thoughtAuthor: obj["_id"],
      thoughtText: thoughtText,
      date: Date.now(),
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
  console.log(userThoughts);
  res.status(200).json(userThoughts);
};
