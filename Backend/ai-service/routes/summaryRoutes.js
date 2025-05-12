// routes/summaryRoutes.js
const express = require("express");
const upload = require("../middleware/multer.js");
const { summaryController } = require("../controllers/summaryController");

const router = express.Router();

// this will populate req.file
router.post("/", upload.single("file"), summaryController);

module.exports = router;
