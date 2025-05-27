const { login, logout, signup,verify,forgotpassword,verifyOtpAndUpdatePassword } = require("../controllers/auth.controllers.js");
const authMiddleware = require('../middlewares/authMiddleware.js')
const { Router } = require("express");
const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/verify",authMiddleware, verify);
router.post("/forgot-password", forgotpassword);
router.post("/update-password", verifyOtpAndUpdatePassword);
module.exports = router;
