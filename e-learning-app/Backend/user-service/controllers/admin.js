const adminService = require("../services/admin");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await adminService.login(email, password);
    res.status(200).send(token);
  } catch (error) {
    res.status(401).send(error.message);
  }
};

exports.createadmin = async (req, res) => {
  try {
    const result = await adminService.createadmin(req.body, res);
  } catch (error) {
    console.error(error);
  }
};

exports.tutorAccept = async (req, res) => {
  try {
    const result = await adminService.acceptTutor(req.params.tutorId);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res
      .status(error.status || 500)
      .json({ error: error.error || "Internal Server Error" });
  }
};

exports.tutorReject = async (req, res) => {
  try {
    const result = await adminService.rejectTutor(req.params.tutorId);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res
      .status(error.status || 500)
      .json({ error: error.error || "Internal Server Error" });
  }
};

// CRUD User

exports.add = async (req, res) => {
  try {
    const userData = req.body;
    const savedUser = await adminService.add(userData);
    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getall = async (req, res) => {
  try {
    const users = await adminService.getall();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getbyid = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await adminService.getbyid(id);
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getbyemail = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await adminService.getbyemail(email);
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by email:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deletebyid = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await adminService.deletebyid(id);
    res.status(200).json(deletedUser);
  } catch (error) {
    console.error("Error deleting user by ID:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deletebyemail = async (req, res) => {
  try {
    const email = req.params.email;
    const deletedUser = await adminService.deletebyemail(email);
    res.status(200).json(deletedUser);
  } catch (error) {
    console.error("Error deleting user by email:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updatebyid = async (req, res) => {
  try {
    const id = req.params.id;
    const newData = req.body;
    const updatedUser = await adminService.updatebyid(id, newData);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user by ID:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.addProvider = async (req, res) => {
  try {
    const result = await adminService.addProvider(req.body);
    res.status(201).json({
      message: "Provider added successfully",
      data: result,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      error: error.message || "Internal Server Error",
    });
  }
};