const { login, logout, signup,verify,forgotpassword,verifyOtpAndUpdatePassword,updateUser } = require("../controllers/auth.controllers.js");
const authMiddleware = require('../middlewares/authMiddleware.js')
const { Router } = require("express");
const router = Router();
const uploadSingleImage = require('../middlewares/upload.js')

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/verify",authMiddleware, verify);
router.post("/forgot-password", forgotpassword);
router.post("/update-password", verifyOtpAndUpdatePassword);
router.post("/update-profile",uploadSingleImage('profile'), updateUser);
module.exports = router;
