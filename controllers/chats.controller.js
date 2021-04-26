exports.sendMessage = async (req, res) => {
  console.log(req.body);
  console.log("SENDMESSAGE");
  res.status(200).json({ msg: "OK" });
};
exports.getAllChats = async (req, res) => {
  console.log(req.user);
  console.log("GETALLMESSAGES");
  res.status(200).json({ msg: "OK" });
};
