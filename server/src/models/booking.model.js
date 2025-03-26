const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mode: { type: String, required: true },
    serviceId: { type: String, required: true },
    price: { type: Number, required: true },
    paymentId: { type: String, required: true, unique: true }, // Store Stripe session ID
    paymentStatus: { type: String, enum: ["Pending", "Paid"], default: "Pending" },
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
