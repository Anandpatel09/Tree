const db = require('../config/db');

const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Member id is required" });
    }

    const query = "DELETE FROM persons WHERE id = ?";
    const [result] = await db.execute(query, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Member not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Member deleted successfully",
    });
  } catch (error) {
    console.error("deleteMember error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
module.exports = { deleteMember };
