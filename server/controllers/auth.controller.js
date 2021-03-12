const UsersSchema = require("../models/users.model");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../config/keys");
const jwt = require("jsonwebtoken");

exports.SignIn = async (req, res) => {
  const userDetails = req.body;

  UsersSchema.findOne({ username: userDetails.username }).then((user) => {
    if (!user) return res.status(400).json({ msg: "User doesnt exist" });
    else {
      bcrypt.compare(userDetails.password, user.password, (error, response) => {
        if (response) {
          const accessToken = generateAccessToken(user);
          res.cookie("token", accessToken, { httpOnly: true });
          return res.status(200).json({ userDetails: { ...user["_doc"] } });
        } else {
          return res
            .status(400)
            .json({ msg: "Wrong username/password combination" });
        }
      });
    }
  });
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
        return res.status(400).json({ msg: err });
      }
      user.password = hash;
      try {
        user.save().then((newUser) => {
          return res.status(200).json(newUser);
        });
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    });
  });
};

exports.currentUser = async (req, res) => {
  return res.json(req.user);
};

exports.logout = async (req, res) => {
  res.clearCookie("token");
  return res.status(200).redirect("/");
};

function generateAccessToken(user) {
  const options = { expiresIn: "2h" };
  const payload = {
    user: {
      username: user.username,
    },
  };
  console.log(JWT_SECRET);

  const accessToken = jwt.sign(payload, JWT_SECRET, options);

  return accessToken;
}
