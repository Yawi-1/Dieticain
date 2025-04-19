import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Loader from "./Loader";
import axios from "axios";
import { fetchService } from "../../Redux/serviceSlice";

const BookingModal = ({ isOpen, onClose, service }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mode: "online",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setFormData({ name: "", email: "", mode: "online" });
      setSuccess(false);
      setError(null);
      setIsVerifying(false);
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
      const { data } = await axios.post(
        "https://dieticain.onrender.com/api/payment/razorpay/create",
        { amount: service.price }
      );

      const options = {
        key: 'rzp_test_cfTSNtTXwpV2hG',
        amount: data.data.amount,
        currency: "INR",
        name: "Your Service App",
        description: `Booking for ${service.title}`,
        order_id: data.data.id,
        prefill: { ...formData },
        handler: async (response) => {
          try {
            setIsVerifying(true);
            await axios.post(
              "https://dieticain.onrender.com/api/payment/razorpay/verify",
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                data: {
                  ...formData,
                  serviceId: service._id,
                  price: service.price,
                },
              }
            );
            setSuccess(true);
            setTimeout(() => onClose(), 2000);
          } catch (error) {
            setError(error.response?.data?.message || "Payment verification failed");
          } finally {
            setIsVerifying(false);
          }
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
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
              <h3 className="text-xl font-bold text-gray-900">
                Service: {service?.title}
              </h3>
              <p className="text-gray-500 mt-1">Price: ₹{service?.price}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Status Indicators */}
          {isSubmitting && <Loader />}

          {isVerifying && (
            <div className="p-4 mb-4 text-blue-800 bg-blue-50 rounded-lg flex items-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Verifying your payment...</span>
            </div>
          )}

          {success && (
            <div className="p-4 mb-4 text-green-800 bg-green-50 rounded-lg flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Payment verified successfully! Redirecting...</span>
            </div>
          )}

          {error && (
            <div className="p-4 text-red-800 bg-red-50 rounded-lg flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Form Content */}
          {!isSubmitting && !isVerifying && !success && (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
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

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Consultation Mode
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {["online", "offline"].map((mode) => (
                      <label
                        key={mode}
                        className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                          formData.mode === mode
                            ? "border-emerald-500 bg-emerald-50"
                            : "border-gray-200"
                        }`}
                      >
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

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
              >
                {isSubmitting ? "Processing..." : "Checkout Now"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;