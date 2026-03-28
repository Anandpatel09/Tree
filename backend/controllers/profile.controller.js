


const { findById } = require("../models/user.model");

const getProfile = async (req, res) => {
  console.log("USER FROM TOKEN:", req.user); //  clean debug

  try {
    const userId = req.user.id;

    const user = await findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // remove sensitive fields
    const {
      password,
      reset_token,
      reset_token_expire,
      ...safeUser
    } = user;

    res.json(safeUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching profile" });
  }
};

module.exports = { getProfile };