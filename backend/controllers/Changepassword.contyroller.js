import bcrypt from "bcrypt";
import db from "../config/db.js";

export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    // 1. Get user from JWT (middleware sets req.user)
    const userId = req.user.id;

    // 2. Get user from DB
    const [rows] = await db.execute(
      "SELECT * FROM users WHERE id = ?",
      [userId]
    );

    const user = rows[0];

    // 3. Check current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // 4. Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 5. Update password
    await db.execute(
      "UPDATE users SET password = ? WHERE id = ?",
      [hashedPassword, userId]
    );

    res.json({
      success: true,
      message: "Password updated successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};