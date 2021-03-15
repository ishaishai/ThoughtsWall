const UsersSchema = require("../models/users.model");

exports.getProfile = async (req, res) => {
  const userToFind = req.query.username;

  try {
    user = await UsersSchema.find(
      { username: userToFind },
      "-__v -_id -Thoughts -Comments -password"
    ).lean();
    res.status(200).json({ userProfile: user[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
