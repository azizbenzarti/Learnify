const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');

router.get('/:studentId', recommendationController.generateRecommendations);

module.exports = router;