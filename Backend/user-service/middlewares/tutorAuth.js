const jwt = require("jsonwebtoken");
require("dotenv").config();

const isTutor = (req, res, next) => {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res
          .status(401)
          .json({ error: "Unauthorized: Token not provided" });
  }
  //console.log("Auth header from isTutor :", authHeader); //debug
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }
  //console.log("Token from isTutor:", token);
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("Error decoding token:", err);
      return res.status(403).json({ error: "Failed to authenticate token" });
    }
    console.log("Decoded token from isTutor:", decoded);
    if (decoded.role !== "tutor") {
      return res
        .status(401)
        .json({ error: "Access is not authorized to this user" });
    }
    next();
  });
};

module.exports = isTutor;
