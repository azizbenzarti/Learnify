
const express = require("express");



require("dotenv").config();

const router = express.Router();

const adminController = require("../controllers/admin");

const isadmin = require("../middlewares/adminAuth");

router.post("/add", isadmin, adminController.add);

router.post("/tutor/accept/:tutorId", adminController.tutorAccept);

router.post("/tutor/reject/:tutorId", adminController.tutorReject);

router.get("/getall", isadmin, adminController.getall);

router.get("/getallstudents", isadmin, adminController.getallstudents);

router.get("/getalltutors", isadmin, adminController.getalltutors);

router.get("/getbyid/:id", isadmin, adminController.getbyid);

router.get("/getbyemail/:email", isadmin, adminController.getbyemail);

router.delete("/deletebyid/:id", isadmin, adminController.deletebyid);

router.delete("/deletebyemail/:email", isadmin, adminController.deletebyemail);

router.put("/update/:id", isadmin, adminController.updatebyid);

router.post("/login", adminController.login);

router.post("/createadmin", adminController.createadmin);

// router.get("/download-cv/:tutorId", async (req, res) => {
//   try {
//     const tutor = await userModel.findById(req.params.tutorId);
//     if (!tutor?.tutorDetails?.cv) {
//       return res.status(404).json({ error: "CV not found" });
//     }

//     // Get the CV URL from Cloudinary
//     const cvUrl = tutor.tutorDetails.cv;

//     // Fetch the file from Cloudinary
//     const response = await axios.get(cvUrl, {
//       responseType: "arraybuffer", // Changed to arraybuffer for better handling
//       headers: {
//         // Add any required Cloudinary auth headers here if needed
//       },
//     });

//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader(
//       "Content-Disposition",
//       `attachment; filename=${tutor.name.replace(/\s+/g, "_")}_CV.pdf`
//     );

//     res.send(Buffer.from(response.data, "binary"));
//   } catch (error) {
//     console.error("Download error:", error);
//     res.status(500).json({ error: "Error downloading file" });
//   }
// });

module.exports = router;
