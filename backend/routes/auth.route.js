const express=require("express");
const router=express.Router();

const { signUp } = require("../controllers/singUp.controller");
const {login}=require("../controllers/login.controller")
const multer = require("multer");
const { forgotPassword } = require("../controllers/forgetPassword.controller");
const { resetPassword } = require("../controllers/resetPassword.controller");
const { Addmember } = require("../controllers/Addmember.controller");
const { getProfile } = require("../controllers/profile.controller");
const authMiddleware = require("../middleware/middleware");
const updateprofile = require("../controllers/updateprofile.controller");
// const { updatePassword } = require("../models/user.model");
const { changePassword } = require("../controllers/Changepassword.contyroller");
const upload = multer({ dest: "uploads/" });

router.post("/signup", upload.single("profile_pic"), signUp);
router.post("/login",login)
router.post("/forgot-password",forgotPassword);
router.post("/reset-password/:token", resetPassword);

//ADD MEMBERS
router.post("/add-members",Addmember)

//get profile
router.get("/get-profile", authMiddleware, getProfile);
router.patch("/profile/:id",updateprofile)
router.put("/update-password/",authMiddleware,changePassword)


module.exports=router