const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Booking = require("../models/booking.model");
const sendEmail = require("../utils/sentMail");

const razorpayClient = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay Order
router.post("/create", async (req, res) => {
  try {
    const { amount } = req.body;
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpayClient.orders.create(options);
    res.status(200).json({
      success: true,
      message: "Razorpay order created successfully",
      data: order,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create Razorpay order",
      error: error.message,
    });
  }
});

// Verify Payment and Create Booking
router.post("/verify", async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, data } = req.body;
    
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed: Invalid signature",
      });
    }

    const booking = new Booking({
      ...data,
      paymentId: razorpay_payment_id,
      paymentStatus: "Paid",
    });

    await booking.save();
    const emailContent = `Your booking has been confirmed. Payment ID: ${razorpay_payment_id}`;
    await sendEmail(data.email, "Booking Confirmation", emailContent);
    res.status(201).json({
      success: true,
      message: "Payment verified and booking created",
      booking,
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({
      success: false,
      message: "Payment verification failed",
      error: error.message,
    });
  }
});

module.exports = router;