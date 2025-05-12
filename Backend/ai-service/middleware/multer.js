// const multer  = require('multer')
// const upload = multer()
// const express = require("express");

// const app = express();
// const { summaryController } = require("../controllers/summaryController");



// app.post('/api/summary', upload.single('file'), summaryController);
// const multer  = require('multer')
// const upload = multer()
// app.post('/api/summary', upload.single('file'), summaryController);
const multer = require("multer");

// configure multer (e.g., memory storage or disk storage)
const storage = multer.memoryStorage(); // or use diskStorage if needed
const upload = multer({ storage });

module.exports = upload;
