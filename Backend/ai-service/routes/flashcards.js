const express = require('express');
const { flashcardController } = require('../controllers/flashcardController');

const router = express.Router();

router.post('/', flashcardController);

module.exports = router;
