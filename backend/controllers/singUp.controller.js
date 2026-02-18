const db = require('../config/db')
const bcrypt = require('bcrypt')


const signUp = async(req,res)=>{

    const {full_name,email,password}=req.body;
    const hashed=await bcrypt.hash(password,8);
 

    const sql="INSERT INTO users(full_name,email,password) VALUES(?,?,?)"
    db.query(sql,[full_name,email,hashed],(err)=>{
        if(err) res.status(500).json(err);   
        res.json({message:"user created successfully"})
    })
}

module.exports = { signUp };