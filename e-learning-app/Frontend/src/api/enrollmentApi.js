import axios from 'axios';

const API_URL = process.env.REACT_APP_ENROLLMENT_SERVICE_URL || 'http://localhost:5001';

console.log("API_URL", API_URL);

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});
const enrollStudent = (studentId, courseId) => {
  return axios.post(`/enrollments`, { studentId, courseId });
};

const getEnrollmentsByStudent = (studentId, token) => {
  console.log("studentId", token, studentId);
  return api.get(`/student/${studentId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

const getEnrollmentsByCourse = (courseId, token) => {
  return axios.get(`}/courses/${courseId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export default {
  enrollStudent,
  getEnrollmentsByStudent,
  getEnrollmentsByCourse
};