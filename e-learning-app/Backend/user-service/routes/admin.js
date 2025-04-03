//define admin routes here 

const express = require("express");

require("dotenv").config();

const router = express.Router();

const adminController = require("../controllers/admin");

const isadmin = require("../middlewares/adminAuth");

router.post("/add", isadmin, adminController.add);

router.post("/tutor/accept/:tutorId", adminController.tutorAccept);

router.post("/tutor/reject/:tutorId", adminController.tutorReject);

router.get("/getall", isadmin, adminController.getall);

router.get("/getbyid/:id", isadmin, adminController.getbyid);

router.get("/getbyemail/:email", isadmin, adminController.getbyemail);

router.delete("/deletebyid/:id", isadmin, adminController.deletebyid);

router.delete("/deletebyemail/:email", isadmin, adminController.deletebyemail);

router.put("/update/:id", isadmin, adminController.updatebyid);

router.post("/login", adminController.login);

router.post("/createadmin", adminController.createadmin);

module.exports = router;
