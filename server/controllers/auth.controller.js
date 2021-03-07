const UsersSchema = require("../models/users.model");

exports.SignIn = async (req, res) => {
  res.status(200).json("sign-in");
};

exports.register = async (req, res) => {
  console.log(req.params, req.body);

  const user = new UsersSchema({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  });
  try {
    const newUser = await user.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
