const db = require("../config/db");

const updateprofile = async (req, res) => {
  const userId = req.params.id;
  const { full_name, email, phone, dob, gender } = req.body;

  const query = `
    UPDATE users 
    SET full_name=?, email=?, phone=?, dob=?, gender=? 
    WHERE id=?
  `;

  try {
    const [result] = await db.execute(query, [full_name, email, phone, dob, gender, userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error Updating Profile" });
  }
};

module.exports = updateprofile;
