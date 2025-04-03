const jwt = require("jsonwebtoken");
require("dotenv").config();

const isAdmin = (req, res, next) => {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res
          .status(401)
          .json({ error: "Unauthorized: Token not provided" });
      }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }
  console.log("Token:", token);
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("Error decoding token:", err);
      return res.status(403).json({ error: "Failed to authenticate token" });
    }
    console.log("Decoded token:", decoded);
    //console.log('this is the role: ',decoded.role);
    if (decoded.role !== "admin") {
      return res
        .status(401)
        .json({ error: "Access is not authorized to this user" });
    }
    next();
  });
};

module.exports = isAdmin;
