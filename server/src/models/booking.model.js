const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      enum: ["online", "offline"],
      default: "online",
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "services", 
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    // paymentId:{
    //   type:String,
    //   required:true
    // }
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
