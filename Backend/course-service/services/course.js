const Course = require("../models/course");
// require("../../user-service/models/User");
const { default: mongoose } = require("mongoose");

const createCourse = async (courseData) => {
  return await Course.create(courseData);
};

const getCourses = async (req, res) => {
  return await Course.find();

  //   return await Course.find().populate("owner", "name email");
};

const getCourseById = async (courseId) => {
  return await Course.findById(courseId);
  // return await Course.findById(courseId).populate('owner', 'name _id');
};

const updateCourse = async (courseId, courseData) => {
  return await Course.findByIdAndUpdate(courseId, courseData, {
    new: true,
    runValidators: true,
  });
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
