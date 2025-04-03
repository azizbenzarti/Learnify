const express = require("express");
const  {
    createCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
  } = require("../controllers/course");

const courseRouter = express.Router();

courseRouter.post("/", createCourse);
courseRouter.get("/", getCourses);
courseRouter.get("/:id", getCourseById);
courseRouter.put("/:id", updateCourse);
courseRouter.delete("/:id", deleteCourse);

module.exports = courseRouter;
