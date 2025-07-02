const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Booking = require("../models/booking.model");
const sendEmail = require("../utils/sentMail");

// Razorpay instance
const razorpayClient = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ Create Razorpay Order
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

// ✅ Verify Payment and Save Booking
router.post("/verify", async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      data, // booking details like name, email, etc.
    } = req.body;

    // Generate expected signature
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

    // Save to MongoDB
    const booking = new Booking({
      ...data,
      paymentId: razorpay_payment_id,
      paymentStatus: "Paid",
    });

    const product = await booking.save();

    // Send confirmation email
    const emailContent = `
Dear ${data.name || 'Customer'},

We’re pleased to inform you that your booking with Nutri Care has been successfully confirmed.

Here are your booking details:

- Registered Email: ${data.email}
- Payment ID: ${razorpay_payment_id}

You can view your confirmation and booking details by visiting the link below:
https://nutricare11.netlify.app/success?session_id=${product._id}

Thank you for choosing Nutri Care. We look forward to serving you!

Warm regards,  
Team Nutri Care
`;

    await sendEmail(data.email, "Booking Confirmation - Nutri Care", emailContent);

    // ✅ Respond with booking ID (used as sessionId)
    res.status(201).json({
      success: true,
      message: "Payment verified and booking created",
      sessionId: booking._id,
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

router.get('/success', async (req, res) => {
  const { session_id } = req.query;
  try {
    const booking = await Booking.findById(session_id).populate('serviceId', 'title price image description duration');
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    res.status(200).json({ success: true, booking });
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
