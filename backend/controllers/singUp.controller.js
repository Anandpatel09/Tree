const db = require("../config/db");
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  const { full_name, email, password, phone, dob, gender } = req.body;

  const hashed = await bcrypt.hash(password, 8);

  const profile_pic = req.file ? req.file.filename : null;

  const sql = `
    INSERT INTO users 
    (full_name, email, password, phone, profile_pic, dob, gender) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [full_name, email, hashed, phone, profile_pic, dob, gender],
    (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error creating user",
          error: err.message,
        });
      }

      return res.status(201).json({
        success: true,
        message: "User created successfully",
      });
    },
  );
};
module.exports = { signUp };
