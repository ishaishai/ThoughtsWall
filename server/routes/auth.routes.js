const router = require("express").Router();
const authCtrl = require("../controllers/auth.controller");

//login and register routes
router.post("/sign-in", usersCtrl.SignIn);
router.post("/register", usersCtrl.register);
