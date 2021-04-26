const router = require("express").Router();
const authCtrl = require("../controllers/auth.controller");
const requiredToken = require("../middlewares/requireToken");

//login and register routes
router.post("/sign-in", authCtrl.SignIn);
router.post("/register", authCtrl.register);
router.get("/logout", requiredToken, authCtrl.logout);
router.get("/current_user", requiredToken, authCtrl.currentUser);
module.exports = router;
