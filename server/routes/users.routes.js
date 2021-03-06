const router = require("express").Router();
const usersCtrl = require("../controllers/users.controller");

//get user details for profile
router.get("/get-user/:username", usersCtrl.getUser);

module.exports = router;
