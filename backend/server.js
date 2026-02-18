const dotenv=require("dotenv")
const express=require("express")
const cors=require("cors")
const  authRoutes =require("./routes/auth.route.js");

require('./config/db')

const app=express()

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes)

const Port=process.env.PORT || 5000
app.listen(Port,()=>console.log(`server is running on port ${Port}`))
