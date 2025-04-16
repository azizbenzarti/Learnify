const profileService = require("../services/profile");
const { getAllStudents } = require("../services/profile");

exports.updateuser = async (req, res) => {
  try {
    await profileService.updateuser(req, res);
  } catch (error) {
    console.error(error);
  }
};

exports.updatepwd = async (req, res) => {
  try {
    await profileService.updatepwd(req, res);
  } catch (error) {
    console.error(error);
  }
};

exports.updateemail = async (req, res) => {
  try {
    await profileService.updateemail(req, res);
  } catch (error) {
    console.error(error);
  }
};

exports.verifyemail = async (req, res) => {
  try {
    const { id, token } = req.params;
    const result = await profileService.verifyemail(id, token);
    if (result.success) {
      res.status(200).send(result.message);
    } else {
      res.status(400).send(result.message);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred.");
  }
};

exports.getallstudentdata = async (req, res) => {
  try {
    await profileService.getallstudentdata(req, res);
  } catch (error) {
    console.error(error);
  }
};

exports.deleteaccount = async (req, res) => {
  try {
    await profileService.deleteaccount(req, res);
  } catch (error) {
    console.error(error);
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await getAllStudents();
    res.status(200).json({ students });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}; 

exports.getStudentById = async (req, res) => {
  try {
    const student = await profileService.getStudentById(req.params.id);
    res.status(200).json(student);
  } catch (error) {
    console.error(error);
    res.status(error.message === "User not found" ? 404 : 500).json({
      message: error.message || "Internal server error"
    });
  }
};

