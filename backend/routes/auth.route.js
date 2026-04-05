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
const { changePassword } = require("../controllers/Changepassword.controller");
const { getDashboardStats } = require("../controllers/Dashboard.controller");
const getAllMembers = require("../controllers/UserDetail.controller");
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
router.get("/dasboard",authMiddleware,getDashboardStats)
router.get("/members",getAllMembers)


module.exports=router