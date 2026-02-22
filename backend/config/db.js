 
 const dotenv=require("dotenv")
 dotenv.config();
 
 const {DB_HOST,DB_USER,DB_PASSWORD,DB_NAME}=process.env

 var mysql=require("mysql2")
  var db=mysql.createConnection({
    host:DB_HOST,
    user:DB_USER,
    password:DB_PASSWORD,   
    database:DB_NAME
 })

 db.connect((err)=>{
    if(err)throw err;
    console.log("database connected successfully")
 })

 module.exports=db;
 