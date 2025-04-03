const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
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
      return res.status(403).json({ error: "Failed to authenticate user" });
    }
    console.log("Decoded token:", decoded);
    req.user = {};
    req.user._id = decoded._id;
    req.user.email = decoded.email;
    req.user.role = decoded.role;
    next();
  });
};

module.exports = authenticateToken;
