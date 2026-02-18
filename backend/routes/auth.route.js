const express=require("express");
const { signUp } = require("../controllers/singUp.controller");
const {login}=require("../controllers/login.controller")
const router=express.Router();

router.post("/signup",signUp)
router.post("/login",login)

module.exports=router