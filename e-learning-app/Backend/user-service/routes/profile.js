const express = require("express");
const authenticate = require("../middlewares/auth");
require("dotenv").config();

const profileController = require("../controllers/profile");

const router = express.Router();

router.get("/getallstudentdata", authenticate, profileController.getallstudentdata);

router.put("/updateemail", authenticate, profileController.updateemail);

router.get("/verify/:id/:token", profileController.verifyemail);

router.put("/updatepwd", authenticate, profileController.updatepwd);

router.put("/updateuser", authenticate, profileController.updateuser);

router.delete("/deleteaccount", profileController.deleteaccount);

router.get("/student", authenticate,profileController.getAllStudents);

router.get("/:id", authenticate, profileController.getStudentById);



module.exports = router;
