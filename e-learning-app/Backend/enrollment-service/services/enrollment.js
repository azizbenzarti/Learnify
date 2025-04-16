const Enrollment = require("../models/enrollment");
const axios = require("axios");
require('dotenv').config();

// Helper function for API requests
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

const enrollStudent = async (studentId, courseId) => {
  return await Enrollment.create({ student: studentId, course: courseId });
};

const getEnrollmentsByStudent = async (studentId, token) => {
  try {
    const enrollments = await Enrollment.find({ student: studentId });
    
    const enrollmentsWithCourses = await Promise.all(
      enrollments.map(async (enrollment) => {
        const courseId = enrollment.course;
        const course = courseId ? await makeAuthenticatedRequest(
          `${process.env.COURSE_SERVICE_URL}/course/${courseId}`,
          token
        ) : null;

        return {
          ...enrollment.toObject(),
          course
        };
      })
    );

    return enrollmentsWithCourses;
  } catch (error) {
    console.error("Error in getEnrollmentsByStudent:", error.message);
    throw error;
  }
};

const getEnrollmentsByCourse = async (courseId,token) => {
 
  try {
    const enrollments = await Enrollment.find({ course: courseId });
    
    const enrollmentsWithStudents = await Promise.all(
      enrollments.map(async (enrollment) => {
        const studentId = enrollment.student;
        const student = studentId ? await makeAuthenticatedRequest(
          `${process.env.USER_SERVICE_URL}/profile/${studentId}`,
          token
        ) : null;

        return {
          ...enrollment.toObject(),
          student
        };
      })
    );

    return enrollmentsWithStudents;
  } catch (error) {
    console.error("Error in getEnrollmentsByCourse:", error.message);
    throw error;
  }
};

module.exports = {
  enrollStudent,
  getEnrollmentsByStudent,
  getEnrollmentsByCourse,
};