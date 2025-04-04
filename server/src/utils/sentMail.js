require('dotenv').config();
const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
    service:'gmail',
  auth: {
    user: 'yawimalik786@gmail.com', 
    pass: 'zsow jrsm ajju ettb', 
  },
});

// Email Sending Function
const sendEmail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: `yawimalik786@gmail.com`,
      to,
      subject,
      text,
    });
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

// // API Route to Send Email
// router.post('/email', async (req, res) => {
//   try {
//     const { to, subject, text } = req.body; // Get email details from request body
//     if (!to || !subject || !text) {
//       return res.status(400).json({ message: "All fields are required" });
//     }
//     await sendEmail(to, subject, text);
//     res.json({ message: "Email sent successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

module.exports = sendEmail;
