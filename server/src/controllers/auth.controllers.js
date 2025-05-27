const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sentMail.js");

// Function to generate a token
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });

// Signup function
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const isUser = await User.findOne({ email });
    if (isUser)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = generateToken(user._id);
    console.log(token);
    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "None" : "Lax",
      maxAge: 3600000,
    });

    res.status(201).json({
      message: "User created",
      user: { id: user._id, name, email },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login function
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Password" });

    // Generate token
    const token = generateToken(user._id);
    const isProduction = process.env.NODE_ENV === "production";
    console.log(token, isProduction);
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "None" : "Lax",
      maxAge: 3600000,
    });

    res.json({
      message: "Login successful",
      user: { id: user._id, name: user.name, email },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const verify = async (req, res) => {
  try {
    const token = req.cookies.authToken; // ✅ Read token from cookies
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Logout function
const logout = async (req, res) => {
  const isProduction = process.env.NODE_ENV === "production";

  res.clearCookie("authToken", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "None" : "Lax",
  });

  res.json({ message: "Logged out" });
};

// Forgot password function
const forgotpassword = async(req,res)=>{
  try {
    const { email } = req.body;
    console.log('email:',email)
    const user =await User.findOne({email});
    console.log((user))
    if(!user){
      return res.status(400).json({message:"Invalid email address"})
    }
    const otp = Math.floor(Math.random() * 1000 + 9000).toString();

    user.otp = otp;
    user.otp_expires = Date.now() + 360000; 
    await user.save();
    await sendMail(email,'Reset Password',`Your otp for password reset : ${otp} <hr> By Nutricare@developers`);
   res.status(200).json({message:`Otp sent to ${email}`})
  } catch (error) {
    res.status(500).json({message:error.message || "Server Error"})
    
  }
}

//Verify Otp
const verifyOtpAndUpdatePassword = async(req,res)=>{
  try {
    const {email,otp,password} = req.body;
     const user =await User.findOne({email});
    if(!user){
      return res.status(400).json({message:"Invalid email address"})
    }
    if(user.otp !== otp || user.otp_expires < Date.now()){
      return res.status(400).json({message:"OTP is incorrect or has expired"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.otp = null;
    user.otp_expires = null;
    await user.save();
    res.status(201).json({message:"Password Updated Successfully..."})
  } catch (error) {
     res.status(500).json({message:error.message || "Server Error"})
  }
}

module.exports = { signup, login, verify, logout,forgotpassword,verifyOtpAndUpdatePassword };
