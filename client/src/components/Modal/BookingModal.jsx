import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BookingModal = ({ isOpen, onClose, service }) => {
  const [formData, setFormData] = useState({ name: "", email: "", mode: "online" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/payment/razorpay/create",
        { amount: service.price }
      );

      console.log('create order response', data)

      const options = {
        key: "rzp_test_cfTSNtTXwpV2hG",
        amount: data.data.amount,
        currency: "INR",
        name: "Nutri Care ",
        description: `Booking for ${service.title}`,
        order_id: data.data.id,
        prefill: { ...formData },
        handler: async (response) => {
          setIsVerifying(true);
          try {
            const verifyRes = await axios.post(
              "http://localhost:8000/api/payment/razorpay/verify",
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
            const sessionId = verifyRes.data?.sessionId;
            console.log('session Id ',sessionId)
            setSuccess(true);
            toast.success("Payment verified successfully! Order details will be sent to your email.");
            setTimeout(() => {
              navigate(`/success?session_id=${sessionId}`);
              onClose();
            }, 1500);
          } catch (verifyError) {
            setError(
              verifyError.response?.data?.message || "Payment verification failed"
            );
          } finally {
            setIsVerifying(false);
          }
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setError(err.response?.data?.message || "Payment initialization failed");
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
          onClick={onClose}
        ></div>

        <div className="inline-block w-full max-w-md p-6 my-8 bg-white rounded-2xl shadow-xl relative z-10">
          {/* Modal header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold">Service: {service?.title}</h3>
              <p className="text-gray-500">Price: ₹{service?.price}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Conditional Rendering */}
          {isSubmitting && <Loader />}
          {isVerifying && (
            <div className="p-4 bg-blue-50 text-blue-800 rounded-lg">
              Verifying your payment...
            </div>
          )}
          {success && (
            <div className="p-4 bg-green-50 text-green-800 rounded-lg">
              Payment verified successfully! Redirecting...
            </div>
          )}
          {error && (
            <div className="p-4 bg-red-50 text-red-800 rounded-lg">
              {error}
            </div>
          )}

          {!isSubmitting && !isVerifying && !success && (
            <form onSubmit={handleFormSubmit} className="space-y-6 mt-4">
              <input
                type="text"
                name="name"
                required
                placeholder="Full Name"
                className="w-full border p-3 rounded"
                value={formData.name}
                onChange={handleInputChange}
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Email Address"
                className="w-full border p-3 rounded"
                value={formData.email}
                onChange={handleInputChange}
              />

              <div className="grid grid-cols-2 gap-2">
                {["online", "offline"].map((mode) => (
                  <label
                    key={mode}
                    className={`p-3 border rounded cursor-pointer ${
                      formData.mode === mode ? "bg-emerald-100 border-emerald-500" : ""
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
                    <span className="capitalize">{mode}</span>
                  </label>
                ))}
              </div>

              <button type="submit" className="w-full bg-emerald-500 text-white py-3 rounded hover:bg-emerald-600">
                Checkout Now
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
