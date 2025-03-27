const { login, logout, signup,verify,verifyOTP } = require("../controllers/auth.controllers.js");
const authMiddleware = require('../middlewares/authMiddleware.js')
const { Router } = require("express");
const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post('/email',verifyOTP)
router.post("/logout", logout);
router.get("/verify",authMiddleware, verify);
module.exports = router;
