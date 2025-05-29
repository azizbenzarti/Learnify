const express = require('express');
const router = express.Router();
const {
  createStudyPlan,
  getStudyPlan,
  getStudentStudyPlan
} = require('../controllers/studyPlan');  
//const authenticate = require('../../user-service/middlewares/auth');  // for development setup

const authenticate = require('../middlewares/auth'); // for docker setup

// Create Study Plan
router.post('/',authenticate, createStudyPlan);

// Get Specific Study Plan
router.get('/:id',authenticate, getStudyPlan);

// Get Study Plans by Student
router.get('/student/:studentId',authenticate, getStudentStudyPlan);

module.exports = router;