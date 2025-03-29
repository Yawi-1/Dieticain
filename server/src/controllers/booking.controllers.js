const Booking = require("../models/booking.model.js");

const getBookings = async (req, res) => {
  try {
    const allBookings = await Booking.find().populate("serviceId", "title");
    res.json({ data: allBookings, message: "All bookings retrieved successfully" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = { getBookings };
