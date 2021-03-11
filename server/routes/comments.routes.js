const router = require("express").Router();
const commentsCtrl = require("../controllers/comments.controller");
const requireToken = require("../middlewares/requireToken");
//get All Comments Per Specific User
router.get("/userComments", requireToken, commentsCtrl.getCurrentUserComments);
router.get(
  "/getThoughtComments",
  requireToken,
  commentsCtrl.getThoughtComments
);
router.post(
  "/addCommentToThought",
  requireToken,
  commentsCtrl.addCommentToThought
);
module.exports = router;
