const express = require("express");

require('dotenv').config();

const router = express.Router();

const upload=require('../middlewares/cvUpload');

const userController = require("../controllers/user");

router.post("/login", userController.login);

router.post(
  "/tutorregister",
  upload.single("cv"),
  userController.tutorRegister
);

router.post("/tutoraccept", userController.tutorAccept);

router.post("/studentregister", userController.studentRegister);

router.get("/verify/:id/:token", userController.verifyStudentAccount); //server version 

// router.get("/verify/:id/:token", async (req, res) => {  //client version 
//   try {
//     await userController.verifyStudentAccount(req, res);
//   } catch (error) {
//     console.error(error);
//     return res.redirect(
//       `${
//         process.env.FRONTEND_URL
//       }/login?success=false&message=${encodeURIComponent("An error occurred.")}`
//     );
//   }
// });

router.post("/forget-password", userController.forgetPassword);

router.post("/reset-password", userController.resetPassword);

//router.get("/logout");

module.exports = router;
