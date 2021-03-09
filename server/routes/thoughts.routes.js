const router = require("express").Router();
const thoughtsCtrl = require("../controllers/thoughts.controller");
const requireToken = require("../middlewares/requireToken");

router.get("/get-all-thoughts", thoughtsCtrl.getAllThoughts);
router.post("/create-thought", requireToken, thoughtsCtrl.createThought);
router.get("/my-thoughts", requireToken, thoughtsCtrl.getMyThoughts);
module.exports = router;
