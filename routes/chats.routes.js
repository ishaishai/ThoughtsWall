const router = require("express").Router();
const chatsController = require("../controllers/chats.controller");
const requireToken = require("../middlewares/requireToken");

router.get("/get-all-chats", requireToken, chatsController.getAllChats);
router.post("/", requireToken, chatsController.createNewChat);
// router.delete("/delete-message/:id",requireToken,chatsController.deleteMessage);
// router.delete("/delete-chat/:id",requireToken,chatsController.deleteChat);
module.exports = router;
