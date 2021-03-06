const CommentsSchema = require("../models/comments.model");
const UsersSchema = require("../models/users.model");
const ThoughtsSchema = require("../models/thoughts.model");
const { timeSince } = require("../utils/dateParser");
const commentsModel = require("../models/comments.model");
const usersModel = require("../models/users.model");
exports.getCurrentUserComments = async (req, res) => {
  res.status(200).json("get current user comments");
};

exports.getThoughtComments = async (req, res) => {
  console.log(req.query.id);
  try {
    thought = await ThoughtsSchema.findOne({ _id: req.query.id })
      .populate({
        path: "comments",
        populate: { path: "commentAuthor", CommentsSchema },
      })
      .lean();
    console.log(thought.comments);
    let comments = JSON.parse(JSON.stringify(thought.comments));
    comments = thought.comments.map((comment) => {
      return {
        id: comment["_id"],
        author: comment.commentAuthor.username,
        commentText: comment.commentText,
        date: `${timeSince(comment.date)} ago`,
      };
    });

    res.status(200).json(comments);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

exports.addCommentToThought = async (req, res) => {
  console.log(req.body, req.user);
  let thoughtId = req.body.thoughtId;
  let commentText = req.body.commentText;
  let comment;
  try {
    user = await UsersSchema.findOne({ username: req.user.username });

    //add comment to comments
    comment = new CommentsSchema({
      commentAuthor: user["_id"],
      commentText: commentText,
      thought: thoughtId,
      date: Date.now(),
    });
    const newComment = await comment.save();

    //add comment to user
    console.log(comment["_id"]);
    user.Comments.push(comment["_id"]);
    await UsersSchema.updateOne(
      { _id: user["_id"] },
      { Comments: user.Comments }
    );

    thought = await ThoughtsSchema.findOne({ _id: thoughtId });

    //add comment to thought
    thought.comments.push(newComment["_id"]);
    await ThoughtsSchema.updateOne(
      { _id: thought["_id"] },
      { comments: thought.comments }
    );

    res.status(200).json({ msg: "OK" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  console.log("DELETECOMMNET");
  const owner = await commentsModel.findOne({ _id: req.params.id });
  const user = await usersModel.findOne({ username: req.user.username });
  console.log(typeof user["_id"], typeof owner.commentAuthor);
  if (user["_id"].toString() === owner.commentAuthor.toString()) {
    console.log("in");
    const response = await commentsModel.deleteOne({ _id: req.params.id });
    console.log(response);
    if (response.n != 1) {
      res.status(500).json({ msg: "error on delete from comments model" });
    }
    res.status(200).json({ msg: "ok" });
  } else {
    res.status(400).json({ msg: "not allowed" });
  }
};
