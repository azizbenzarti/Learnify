const studyRequestService = require('../services/studyRequest');



  exports.createStudyRequest= async (req, res, next) => {
    try {
      const { studentId } = req.body;
      const token = req.headers.authorization?.split(' ')[1]; // Extract bearer token
      
      if (!token) {
        return res.status(401).json({ error: 'Authorization token required' });
      }
      
      const studyRequest = await studyRequestService.createStudyRequest(studentId, token);
      
      res.status(201).json({
        success: true,
        data: studyRequest
      });
    } catch (error) {
      next(error);
    }
  };

