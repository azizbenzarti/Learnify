const Course = require("../models/Course");

const createCourse = async (courseData) => {
  return await Course.create(courseData);
};

const getCourses = async () => {
    return await Course.find();
//   return await Course.find().populate("owner", "name email");
};

const getCourseById = async (courseId) => {
//   return await Course.findById(courseId).populate("owner", "name email");
  return await Course.findById(courseId);
};

const updateCourse = async (courseId, courseData) => {
  return await Course.findByIdAndUpdate(courseId, courseData, { new: true, runValidators: true });
};

const deleteCourse = async (courseId) => {
  return await Course.findByIdAndDelete(courseId);
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
