const router = require("express").Router();
const authCtrl = require("../controllers/auth.controller");

//login and register routes
router.post("/sign-in", authCtrl.SignIn);
router.post("/register", authCtrl.register);

module.exports = router;
