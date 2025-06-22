require('dotenv').config();
const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mudasirjavidmalik1@gmail.com',
    pass: 'rmin naen pmqw spyc',
  },
});

// Email Sending Function
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: 'Nutri Care <your-email@example.com>',
      to,
      subject,
      text,
      html,
    });
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};



module.exports = sendEmail;
