const router = require("express").Router();
const thoughtsCtrl = require("../controllers/thoughts.controller");

router.get("/get-all-thoughts", thoughtsCtrl.getAllThoughts);
router.post("/create-thought", thoughtsCtrl.createThought);
module.exports = router;
