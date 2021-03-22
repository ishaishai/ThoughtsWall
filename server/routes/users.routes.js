const router = require("express").Router();
const usersCtrl = require("../controllers/users.controller");
const requireToken = require("../middlewares/requireToken");
const uploadFile = require("../middlewares/uploadFile");
//get user details for profile
router.get("/get-profile", requireToken, usersCtrl.getProfile);
router.post(
  "/update-profile",
  requireToken,
  uploadFile.single("profile-img"),
  usersCtrl.updateProfile
);

module.exports = router;
