import db from "../config/db.js";

export const getDashboardStats = async (req, res) => {
  try {
    // ✅ Stats (UPDATED: newThisMonth from persons)
    const [stats] = await db.execute(`
      SELECT 
        (SELECT COUNT(*) FROM persons) AS totalFamilies,

        (SELECT COUNT(*) FROM persons) + 
        (SELECT COUNT(*) FROM children) AS totalMembers,

        (SELECT COUNT(*) FROM persons 
          WHERE MONTH(created_at) = MONTH(CURRENT_DATE())
          AND YEAR(created_at) = YEAR(CURRENT_DATE())
        ) AS newThisMonth
    `);

    // ✅ Members Data
    const [membersData] = await db.execute(`
      SELECT 
        p.id,
        p.fullName,
        p.gender,
        p.father,
        p.mother,
        p.grandfather,
        p.grandmother,
        GROUP_CONCAT(c.child_name) AS children
      FROM persons p
      LEFT JOIN children c 
      ON p.id = c.person_id
      GROUP BY p.id
    `);

    // ✅ Format children array
    const formattedMembers = membersData.map((item) => ({
      ...item,
      children: item.children ? item.children.split(",") : [],
    }));
 
    res.json({
      ...stats[0],
      members: formattedMembers,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching dashboard stats" });
  }
};