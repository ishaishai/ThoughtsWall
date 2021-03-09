const UsersSchema = require("../models/users.model");

exports.getUser = async (req, res) => {
  const userToFind = req.params.username;
  let user;
  try {
    user = await UsersSchema.find({ username: userToFind });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProfile = async (req, res) => {
  const userToFind = req.user.username;
  let user;
  try {
    user = await UsersSchema.find({ username: userToFind });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
