const router = require("express").Router();
const commentsCtrl = require("../controllers/comments.controller");

//get All Comments Per Specific User
router.get("/userComments", commentsCtrl.getCurrentUserComments);

module.exports = router;
