const StudyRequest = require('../models/studyRequest');
const axios = require('axios');
require('dotenv').config();
const ENROLLMENT_URL = process.env.ENROLLMENT_SERVICE_URL; // Ensure this is set in your environment variables
console.log("ENROLLMENT_URL", ENROLLMENT_URL);

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

const makeAuthenticatedRequest = async (url, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token.trim()}`,
      },
      timeout: 5000
    };
  
    try {
      const response = await axios.get(url, config);
      return response.data;
    } catch (error) {
      console.error(`API request failed to ${url}:`, error.response?.data || error.message);
      return null;
    }
  };

  const mapEnrollmentsToSubjects=(enrollments) => {
    if (!Array.isArray(enrollments)) {
      throw new Error('Expected enrollments to be an array');
    }
    return enrollments.map(enrollment => ({
      name: enrollment.course.course?.name || 'Unknown Course',
      grade: enrollment.grade || 0, // Default grade if not provided
      exam_date: enrollment.course.course?.exam_date || new Date(), // Default to current date if not provided
      course_id: enrollment.course.course._id, // Handle both populated and unpopulated
    //   chapter_ids: enrollment.course?.chapters || []
    }));
  }

;
// studentId, token
exports.createStudyRequest = async (studentId, token) => {
  try {
    if (!studentId || !token) {
      throw new Error('Student ID and token are required');
    }

    // Fetch enrollments
    const response = await makeAuthenticatedRequest(
      `${ENROLLMENT_URL}/student/${studentId}`,
      token
    );
  

   if (!response) {
      throw new NotFoundError(`No enrollments found for this student ${studentId}`);
    }

    // Map enrollments to subjects - pass response.enrollments (the array) not the whole response
    const subjects = mapEnrollmentsToSubjects(response.enrollments);

    // Create study request
    const studyRequest = await StudyRequest.create({
      student_id: studentId,
      subjects: subjects
    });

    return studyRequest;
  } catch (error) {
    console.error('Error in createStudyRequest:', error);
    throw error;
  }
};

