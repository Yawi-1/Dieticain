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
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 3600000,
    });

    res
      .status(201)
      .json({
        message: "User created",
        user: { id: user._id, name, email },
        token,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login function



// Login function
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Password" });

    // Generate and save OTP
    const otp = Math.floor(1000 + Math.random() * 9000);
    user.otp = otp;
    user.otp_expires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // Send OTP via email
    await sendMail(email, "Your Login OTP", `Your OTP is: ${otp}`);
    
    res.status(200).json({ 
      message: "OTP sent to email", 
      email,
      expiresIn: 600 // 10 minutes in seconds
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


const verifyOTP = async (req, res) => {
  console.log('User OTp ',req.body)
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) return res.status(400).json({ message: "User not found" });
    if (parseInt(user.otp) !== parseInt(otp) || user.otp_expires <= Date.now()) {
      return res.status(400).json({ message: "Invalid  OTP" });
    }

    // Clear OTP after successful verification
    user.otp = undefined;
    user.otp_expires = undefined;
    await user.save();

    // Generate token
    const token = generateToken(user._id);
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
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



//  verify Authentication function
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
  res.clearCookie("authToken");
  res.json({ message: "Logged out" });
};

module.exports = { signup, login, verify, logout,verifyOTP };
