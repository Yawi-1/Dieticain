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
  res.clearCookie("authToken");
  res.json({ message: "Logged out" });
};

module.exports = { signup, login, verify, logout };
