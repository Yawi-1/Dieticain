const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Booking = require("../models/booking.model.js");

const router = express.Router();

// 1️⃣ Create a Stripe Checkout Session
router.post("/create", async (req, res) => {
  try {
    const { name, email, mode, serviceId, title, price } = req.body;

    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: { name: title },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: { serviceId },
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    res.json({ message: "Session Url revieved", url: session.url });
  } catch (error) {
    res.redirect(500, `${process.env.FRONTEND_URL}/cancel`);
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: error.message });
  }
});

// 2️⃣ Verify Payment and Store Order
router.get("/verify-payment", async (req, res) => {
  try {
    const { session_id } = req.query;
    if (!session_id) {
      return res.status(400).json({ error: "Session ID is required" });
    }

    // Retrieve session details from Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== "paid") {
      return res.status(400).json({ error: "Payment not successful" });
    }

    // Check if booking already exists
    const existingBooking = await Booking.findOne({ paymentId: session.id });
    if (existingBooking) {
      return res
        .status(200)
        .json({ message: "Booking already stored", booking: existingBooking });
    }

    // Create a new booking record
    const newBooking = new Booking({
      name: session.customer_details?.name || "Unknown",
      email: session.customer_email,
      mode: "online",
      serviceId: session.metadata.serviceId, 
      price: session.amount_total / 100, 
      paymentId: session.id, 
      paymentStatus: "Paid",
    });

    await newBooking.save();

    res
      .status(200)
      .json({ message: "Booking stored successfully", booking: newBooking });
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
