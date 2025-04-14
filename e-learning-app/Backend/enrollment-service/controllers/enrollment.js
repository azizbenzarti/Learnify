const enrollmentService = require("../services/enrollment");

const enroll = async (req, res) => {
  const { studentId, courseId } = req.body;

  try {
    const enrollment = await enrollmentService.enrollStudent(studentId, courseId);
    res.status(201).json({ enrollment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




const getStudentEnrollments = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Extract token from the header
    const enrollments = await enrollmentService.getEnrollmentsByStudent(req.params.studentId, token);
    res.status(200).json({ enrollments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCourseEnrollments = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Extract token from the header
    const enrollments = await enrollmentService.getEnrollmentsByCourse(req.params.courseId,token);
    res.status(200).json({ enrollments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  enroll,
  getStudentEnrollments,
  getCourseEnrollments,
};
