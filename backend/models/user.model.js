
const db = require("../config/db");
// import db from "../config/db.js";
// Find user by email
const findByEmail = async (email) => {
  try {
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw error;
  }
};

// Find user by ID
const findById = async (id) => {
  try {
    const [rows] = await db.execute("SELECT * FROM users WHERE id = ?", [id]);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("Error finding user by ID:", error);
    throw error;
  }
};

// Update reset token
const updateResetToken = async (email, token, expireTime) => {
  try {
    await db.execute(
      "UPDATE users SET reset_token = ?, reset_token_expire = ? WHERE email = ?",
      [token, expireTime, email]
    );
  } catch (error) {
    console.error("Error updating reset token:", error);
    throw error;
  }
};

// Find user by valid (non-expired) reset token
const findByValidToken = async (token) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM users WHERE reset_token = ? AND reset_token_expire > ?",
      [token, Date.now()]
    );
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("Error finding user by valid token:", error);
    throw error;
  }
};

// Update password
const updatePassword = async (token, hashedPassword) => {
  try {
    await db.execute(
      "UPDATE users SET password = ?, reset_token = NULL, reset_token_expire = NULL WHERE reset_token = ?",
      [hashedPassword, token]
    );
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
};

// Check if email exists
const emailExists = async (email) => {
  try {
    const [rows] = await db.execute("SELECT id FROM users WHERE email = ?", [email]);
    return rows.length > 0;
  } catch (error) {
    console.error("Error checking if email exists:", error);
    throw error;
  }
};




module.exports = {
  findByEmail,
  findById,
  updateResetToken,
  findByValidToken,
  updatePassword,
  emailExists,
};

