import axios from "axios";

const API_URL = process.env.REACT_APP_ENROLLMENT_SERVICE_URL;

console.log("API_URL", API_URL);

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});
const enrollStudent = (studentId, courseId) => {
  return api.post(`/enrollment`, { studentId, courseId });
};

const getEnrollmentsByStudent = (studentId, token) => {
  console.log("studentId", token, studentId);
  return api.get(`/student/${studentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const getEnrollmentsByCourse = (courseId, token) => {
  return api.get(`/course/${courseId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export default {
  enrollStudent,
  getEnrollmentsByStudent,
  getEnrollmentsByCourse,
};
