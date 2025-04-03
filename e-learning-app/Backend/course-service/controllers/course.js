const CourseService = require("../services/course");

const createCourse = async (req, res) => {
  try {
    const newcourse = await CourseService.createCourse(req.body);
    res.status(201).json({course:newcourse});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCourses = async (req, res) => {
  try {
    const courses = await CourseService.getCourses();
    res.status(200).json({courses:courses});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCourseById = async (req, res) => {
  try {
    const foundcourse = await CourseService.getCourseById(req.params.id);
    if (!foundcourse) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json({course: foundcourse});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCourse = async (req, res) => {
  try {
    const course = await CourseService.updateCourse(req.params.id, req.body);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const course = await CourseService.deleteCourse(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
