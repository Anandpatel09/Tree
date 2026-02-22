const express=require("express");
const { signUp } = require("../controllers/singUp.controller");
const {login}=require("../controllers/login.controller")
const router=express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// router.post("/signup",signUp)
router.post("/signup", upload.single("profile_pic"), signUp);
router.post("/login",login)

module.exports=router