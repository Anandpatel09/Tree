const jwt = require("jsonwebtoken");
 const authMiddleware = (req, res, next) => {
  try {
    // Get token from headers
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, "SECRET_KEY");

    // Save user info in request
    req.user = decoded;

    next(); // go to next controller
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;