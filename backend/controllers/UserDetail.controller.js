const db = require("../config/db");

 const getAllMembers = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT 
        p.id,
        p.fullName,
        p.gender,
        p.father,
        p.mother,
        p.grandfather,
        p.grandmother,
        p.phone,
        p.file,
        p.address,
        p.village,
        p.created_at,
        GROUP_CONCAT(c.child_name) AS children
      FROM persons p
      LEFT JOIN children c 
      ON p.id = c.person_id
      GROUP BY p.id
    `);

    // ✅ Convert children string → array + image URL
    const formattedData = rows.map((item) => ({
      ...item,
      children: item.children ? item.children.split(",") : [],
      profile_pic: item.profile_pic
        ? `http://localhost:5000/uploads/${item.profile_pic}`
        : null,
    }));

    res.json({
      success: true,
      data: formattedData,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching members",
    });
  }
};

module.exports = getAllMembers;
