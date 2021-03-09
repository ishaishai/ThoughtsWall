const router = require("express").Router();
const usersCtrl = require("../controllers/users.controller");
const requireToken = require("../middlewares/requireToken");
//get user details for profile
router.get("/get-user/:username", requireToken, usersCtrl.getUser);
router.get("/get-user/profile", requireToken, usersCtrl.getProfile);

module.exports = router;
