const express = require("express");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const router = express.Router();

const saucesCtrl = require("../controllers/sauces");

router.get("/", saucesCtrl.getAll);
router.get("/:id", auth, saucesCtrl.getOne);
router.post("/", auth, multer, saucesCtrl.create);
router.post("/:id/like", auth, multer, saucesCtrl.like);
router.put("/:id", auth, multer, saucesCtrl.edit);
router.delete("/:id", auth, saucesCtrl.delete);

module.exports = router;
