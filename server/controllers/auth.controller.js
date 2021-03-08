const UsersSchema = require("../models/users.model");
const bcrypt = require("bcrypt");

exports.SignIn = async (req, res) => {
  res.status(200).json("sign-in");
};

exports.register = async (req, res) => {
  console.log(req.params, req.body);

  UsersSchema.findOne({ email: req.body.email }).then((user) => {
    if (user) return res.status(400).json({ msg: "User already exists" });
  });

  const user = new UsersSchema({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        res.status(400).json({ msg: err });
      }
      user.password = hash;
      try {
        user.save().then((newUser) => {
          res.status(200).json(newUser);
        });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    });
  });
};
