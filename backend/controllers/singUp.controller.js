const db = require("../config/db");
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  const { full_name, email, password, phone, dob, gender } = req.body;

  try {
    //  VALIDATION: Check if all required fields are present
    if (!full_name || !email || !password || !phone) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields: full_name, email, password, phone",
      });
    }

    //  CHECK IF EMAIL ALREADY EXISTS (BEFORE HASHING)
    const [existingUsers] = await db.execute(
      "SELECT email FROM users WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Email already registered. Please use a different email or login.",
      });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Get profile picture if uploaded
    const profile_pic = req.file ? req.file.filename : null;

    // INSERT NEW USER with proper SQL
    const sql = `
      INSERT INTO users 
      (full_name, email, password, phone, profile_pic, dob, gender) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    await db.execute(sql, [full_name, email, hashed, phone, profile_pic, dob, gender]);
    return res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (err) {
    console.error("Signup Error:", err);

    // Handle specific MySQL errors
    if (err.code === "ER_DUP_ENTRY") {
      
      return res.status(409).json({
        success: false,
        message: "Email already registered",
        error: err.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error creating user",
      error: err.message,
    });
  }
};

module.exports = { signUp };


