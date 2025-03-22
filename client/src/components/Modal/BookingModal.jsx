import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bookService } from "../../Redux/serviceSlice";
import Loader from "./Loader";

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
      // Reset form when modal opens
      setFormData({ name: "", email: "", mode: "online" });
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
    try {
      const bookingData = {
        ...formData,
        serviceId: service._id,
        price: service.price,
      };
      const result = await dispatch(bookService(bookingData));
      console.log("Result :", result);
    } catch (error) {
      console.error("Booking failed:", error);
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
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Service: {service?.title}
              </h3>
              <p className="text-gray-500 mt-1">Price: ${service?.price}</p>
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

          {isSubmitting && (
            <Loader/>
          )}

          {success && (
            <div className="absolute inset-0 z-50 bg-white/80 flex items-center justify-center rounded-2xl">
              <div className="text-center">
                <svg
                  className="mx-auto h-12 w-12 text-emerald-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  Booking Successful!
                </h3>
              </div>
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Consultation Mode
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                      formData.mode === "online"
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="mode"
                      value="online"
                      checked={formData.mode === "online"}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <svg
                      className="w-5 h-5 mr-2 text-emerald-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-sm">Online</span>
                  </label>
                  <label
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                      formData.mode === "offline"
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="mode"
                      value="offline"
                      checked={formData.mode === "offline"}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <svg
                      className="w-5 h-5 mr-2 text-emerald-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="text-sm">In-person</span>
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              {isSubmitting ? "Processing..." : "Confirm Booking"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
