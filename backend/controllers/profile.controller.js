const { findById } = require("../models/user.model");

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // from token

    const user = await findById(userId); // ✅ correct usage

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching profile" });
  }
};

module.exports = { getProfile };