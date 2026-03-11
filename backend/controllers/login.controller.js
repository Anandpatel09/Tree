const jwt = require("jsonwebtoken");
const db = require('../config/db');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //  VALIDATION: Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    //  Use promise-based query (not callback)
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);

    //  Check if user exists
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const user = rows[0];
    console.log(rows.length, "knencecncocndqndojendejdnejdnce2do==========")

    //  Verify password
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    //  Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    //  Return success response (don't expose sensitive data)
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        phone: user.phone,
        profile_pic: user.profile_pic,
      },
    });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during login",
      error: error.message,
    });
  }
};

module.exports = { login };
