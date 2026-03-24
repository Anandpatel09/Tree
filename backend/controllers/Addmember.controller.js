const db = require("../config/db");

const Addmember = async (req, res) => {
  try {

    const {
      fullName = null,
      wifename = null,
      father = null,
      mother = null,
      grandfather = null,
      grandmother = null,
      dob = null,
      gender = null,
      village = null,
      address = null,
      phone = null,
      file = null,
      children = []
    } = req.body || {};

    /* -------- INSERT PERSON -------- */

     if(!req.body.dob){
      return res.status(400).json({
        message:"DOB is required",
      })
    }

    const query = `
      INSERT INTO persons
      (fullName, wifename, dob, gender, father, mother, grandfather, grandmother,file, village, address, phone)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
    `;

    const [result] = await db.execute(query, [
      fullName,
      wifename,
      dob,
      gender,
      father,
      mother,
      grandfather,
      grandmother,
      village,
      address,
      file,
      phone
    ]);

    const personId = result.insertId;

   
    /* -------- INSERT CHILDREN -------- */

    if (children && children.length > 0) {
      for (const child of children) {

        const child_name = child.child_name || null;
        const child_gender = child.child_gender || null;

        await db.execute(
          `INSERT INTO children (person_id, child_name, child_gender)
           VALUES (?, ?, ?)`,
          [personId, child_name, child_gender]
        );
      }
    }

    /* -------- FETCH PERSON -------- */

    const [person] = await db.execute(
      `SELECT * FROM persons WHERE id = ?`,
      [personId]
    );

    /* -------- FETCH CHILDREN -------- */

    const [childlist] = await db.execute(
      `SELECT child_name, child_gender 
       FROM children 
       WHERE person_id = ?`,
      [personId]
    );

    /* -------- RESPONSE -------- */

    res.status(200).json({
      message: "Person added successfully",
      data: {
        ...person[0],
        children: childlist
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

module.exports = { Addmember };


