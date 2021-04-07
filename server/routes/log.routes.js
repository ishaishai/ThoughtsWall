const router = require("express").Router();
const logCtrl = require("../controllers/log.controller");

router.post("/", logCtrl.logEntry);

module.exports = router;
