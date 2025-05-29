const express = require("express");

// const isTutor = require("../../user-service/middlewares/tutorAuth"); // for development setup

//const authenticate = require("../../user-service/middlewares/auth"); // for development setup

const authenticate = require('../middlewares/auth'); // for docker setup

const isTutor = require("../middlewares/tutorAuth"); // for docker setup


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
