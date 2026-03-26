const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    console.log("tokkkkeeeeennnnniiiizzzzaaaatttiooon",token);

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // ✅ REMOVE "Bearer "
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // const decoded = jwt.verify(token, "SECRET_KEY");
    console.log("cdchjdb chjdbchdsbchdsbcdhskbcdskhbcdskhbcdshc===",decoded)

    req.user = decoded;

    next();
  } catch (error) {
    console.log("JWT Error:", error.message); // 🔍 DEBUG
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
