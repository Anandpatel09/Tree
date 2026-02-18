const jwt =require("jsonwebtoken");

const login = async(requestAnimationFrame,res)=>{
    const {email,password}=req.body;
    db.query("SELECT * FROM users WHERE email=?",[email], async(err,data)=>{
        if(err) return res.status(500).json(err);
        if(data.length===0) return res.status(404).json("User not found");

        const user =data[0];
        const match = await bcrypt.compare(password,user.password);

        const token =jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:"1d}"});
        res.json({
            message:"Login Successfully",
            token,
            user
        });

    })
}

module.exports={login}