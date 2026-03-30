const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // ✅ REMOVE "Bearer "
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    console.log("JWT Error:", error.message); // 🔍 DEBUG
    return res.status(403).json({ message: "Invalid token" });
  }
};
module.exports = authMiddleware;