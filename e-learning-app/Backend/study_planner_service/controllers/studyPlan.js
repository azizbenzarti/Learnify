const studyPlanService = require('../services/studyPlan');

async function createStudyPlan(req, res) {
  try {
    const { studyRequestId } = req.body;
    const result = await studyPlanService.createStudyPlan(studyRequestId);

    if (result.success) {
      return res.status(201).json({
        success: true,
        message: 'Study plan created successfully',
        data: result.studyPlan
      });
    }

    if (result.existingPlan) {
      return res.status(200).json({
        success: true,
        message: 'Study plan already exists',
        data: result.existingPlan
      });
    }

    return res.status(400).json({
      success: false,
      message: result.error,
      suggestion: result.recoverySuggestion
    });
  } catch (error) {
    console.error('Controller error creating study plan:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
}

async function getStudyPlan(req, res) {  // Changed from GetStudyPlan to getStudyPlan
  try {
    const { id } = req.params;
    const result = await studyPlanService.getStudyPlan(id);

    if (result.success) {
      return res.status(200).json({
        success: true,
        data: result.studyPlan
      });
    }

    return res.status(404).json({
      success: false,
      message: result.error
    });
  } catch (error) {
    console.error('Controller error getting study plan:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}

async function getStudentStudyPlan(req, res) {  // Changed from GetStudentStudyPlan to getStudentStudyPlan
  try {
    const { studentId } = req.params;
    const result = await studyPlanService.getStudyPlansByStudent(studentId);

    if (result.success) {
      return res.status(200).json({
        success: true,
        count: result.studyPlans.length,
        data: result.studyPlans
      });
    }

    return res.status(404).json({
      success: false,
      message: result.error
    });
  } catch (error) {
    console.error('Controller error getting student study plans:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}

module.exports = {
  createStudyPlan,
  getStudyPlan,        
  getStudentStudyPlan  
};