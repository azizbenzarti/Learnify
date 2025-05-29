const express = require("express");
const router = express.Router();

const{
enroll,
getStudentEnrollments,
getCourseEnrollments,
} = require("../controllers/enrollment");

// const authenticate=require("../../user-service/middlewares/auth"); // for development setup 

const authenticate = require('../middlewares/auth'); // for docker setup


router.post("/enrollment",enroll);

router.get("/student/:studentId",authenticate, getStudentEnrollments);

router.get("/course/:courseId", getCourseEnrollments);

router.get("/test", (req, res) => {
    res.send("Enrollment route works!");
});


module.exports = router;
