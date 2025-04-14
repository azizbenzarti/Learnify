const express = require("express");

const isTutor = require("../../user-service/middlewares/tutorAuth");

const authenticate=require("../../user-service/middlewares/auth");

const  {
    createCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
  } = require("../controllers/course");

const courseRouter = express.Router();

courseRouter.post("/",isTutor,authenticate, createCourse);
courseRouter.get("/",authenticate,getCourses);
courseRouter.get("/:id",authenticate, getCourseById);
courseRouter.put("/:id", isTutor,authenticate, updateCourse);
courseRouter.delete("/:id",isTutor ,authenticate, deleteCourse);

module.exports = courseRouter;
