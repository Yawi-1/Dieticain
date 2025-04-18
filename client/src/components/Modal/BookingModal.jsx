import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Loader from "./Loader";
import axios from "axios";
import { fetchService } from "../../Redux/serviceSlice"; // fetchService instead of bookService

const BookingModal = ({ isOpen, onClose, service }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mode: "online",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setFormData({ name: "", email: "", mode: "online" });
      setSuccess(false);
      setError(null);
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // 1. Create Razorpay order
      const { data } = await axios.post("http://localhost:3000/api/payment/razorpay/create", {
        amount: service.price,
      });

      const order = data.data;

      // 2. Configure Razorpay options
      const options = {
        key:  'rzp_test_cfTSNtTXwpV2hG', 
        amount: order.amount,
        currency: "INR",
        name: "Your Service App",
        description: `Booking for ${service.title}`,
        order_id: order.id,
        prefill: {
          name: formData.name,
          email: formData.email,
        },
        handler: async (response) => {
          try {
            // 3. Verify payment
            await axios.post("http://localhost:3000/api/payment/razorpay/verify", {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              data: {
                ...formData,
                serviceId: service._id,
                price: service.price,
              },
            });

            setSuccess(true);
            dispatch(fetchService()); // Update service data after booking
            setTimeout(() => onClose(), 2000);
          } catch (error) {
            console.error("Payment verification error:", error);
            setError(error.response?.data?.message || "Payment verification failed");
          }
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Payment initialization failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 text-center">
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        ></div>

        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-2xl shadow-xl">
          {/* Modal Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Service: {service?.title}</h3>
              <p className="text-gray-500 mt-1">Price: ₹{service?.price}</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {isSubmitting && <Loader />}
          {success && (
            <div className="text-green-600 text-center">Payment Successful!</div>
          )}
          {error && (
            <div className="text-red-500 text-sm mb-4 bg-red-100 p-2 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Form Fields */}
            <div className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-emerald-500"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-emerald-500"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              {/* Consultation Mode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Consultation Mode</label>
                <div className="grid grid-cols-2 gap-2">
                  {["online", "offline"].map((mode) => (
                    <label key={mode} className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                      formData.mode === mode ? "border-emerald-500 bg-emerald-50" : "border-gray-200"
                    }`}>
                      <input
                        type="radio"
                        name="mode"
                        value={mode}
                        checked={formData.mode === mode}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <span className="text-sm capitalize">{mode}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
            >
              {isSubmitting ? "Processing..." : "Checkout Now"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
