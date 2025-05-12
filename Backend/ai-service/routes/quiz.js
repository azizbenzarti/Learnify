const express = require('express');
const { quizController } = require('../controllers/quizController');

const router = express.Router();

// POST /api/quizzes
router.post('/', quizController);

module.exports = router;
