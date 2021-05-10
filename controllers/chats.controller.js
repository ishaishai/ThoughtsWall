const chatsSchema = require("../models/chats.model");
const usersSchema = require("../models/users.model");

exports.createNewChat = async (req, res) => {
  console.log(req.body);

  const users = await usersSchema.find(
    {
      username: { $in: [req.body.recieverName, req.body.senderName] },
    },
    "_id"
  );

  console.log("FOUND USERS", users);

  const newChat = new chatsSchema({
    users: [users[0]["_id"], users[1]["_id"]],
  });

  try {
    const savedChat = await newChat.save();
    console.log(savedChat);
    try {
      console.log("BABABBA");
      const response = await usersSchema.updateMany(
        {
          _id: { $in: [users[0]["_id"], [users[1]["_id"]]] },
        },
        { $push: { chats: savedChat["_id"] } }
      );
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};
exports.getAllChats = async (req, res) => {
  console.log(req.user);
  console.log("GETALLMESSAGES");
  res.status(200).json({ msg: "OK" });
};
