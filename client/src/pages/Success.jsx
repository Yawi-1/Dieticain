import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Confetti from "react-confetti";
import domtoimage from "dom-to-image-more";
import {
  FaCheckCircle,
  FaCopy,
  FaDownload,
  FaTicketAlt,
} from "react-icons/fa";
import Layout from "../components/Layout/Layout";

const Success = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const ticketRef = useRef(null);

  useEffect(() => {
    if (!sessionId) {
      navigate("/");
    } else {
      axios
        .get(
          `https://dieticain.onrender.com/api/payment/razorpay/success?session_id=${sessionId}`
        )
        .then((res) => {
          setOrder(res.data.booking);
        })
        .catch((err) => {
          console.error(err);
          setError(err.response?.data?.error || "Something went wrong");
        })
        .finally(() => setLoading(false));
    }
  }, [sessionId, navigate]);

  const handleCopy = () => {
    navigator.clipboard.writeText(order?._id || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveImage = async () => {
    if (!ticketRef.current) return;
    setIsSaving(true);
    try {
      const dataUrl = await domtoimage.toPng(ticketRef.current);
      const link = document.createElement("a");
      link.download = "booking-ticket.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Error saving image:", err);
      alert("Error saving image. Please try again.");
    }
    setIsSaving(false);
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-red-600 text-center py-10">{error}</div>;

  return (
    <Layout>
      <div className="min-h-screen bg-[#f0fdf4]">
        <Confetti recycle={false} numberOfPieces={400} gravity={0.2} />

        <div className="max-w-2xl mx-auto px-4 py-12 sm:py-16">
          {/* Top Message */}
          <div className="text-center mb-10">
            <div className="mx-auto bg-green-500 w-24 h-24 rounded-full flex items-center justify-center mb-6">
              <FaCheckCircle className="text-white text-5xl animate-bounce" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Payment Successful! 🎉
            </h1>
            <p className="text-lg text-gray-600">
              Thank you,{" "}
              <span className="font-semibold text-green-600">{order?.name}</span>.{" "}
              Your booking for{" "}
              <span className="font-semibold">{order?.serviceId?.title}</span>{" "}
              is confirmed!
            </p>
          </div>

          {/* Ticket / Receipt Card */}
          <div
            ref={ticketRef}
            className="rounded-lg shadow-xl bg-white p-6 border border-gray-200"
            style={{ fontFamily: "Segoe UI, sans-serif" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <FaTicketAlt className="text-green-600 text-3xl" />
              <h2 className="text-2xl font-bold text-gray-800">
                Booking Receipt
              </h2>
            </div>

            <div className="space-y-4 text-gray-800 text-sm">
              <div className="flex justify-between">
                <span className="font-semibold">Booking ID:</span>
                <span className="text-green-700 break-all">{order?._id}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Amount Paid:</span>
                <span className="text-green-700">
                  ₹{order?.price} /- INR
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Service Mode:</span>
                <span className="capitalize text-blue-700 bg-blue-100 px-3 py-1 rounded-full text-xs">
                  {order?.mode}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Contact Email:</span>
                <span>{order?.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Date:</span>
                <span>{new Date(order?.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="mt-6 text-xs text-center text-gray-600 border-t pt-4">
              ✅ Please present this receipt at the service location.<br />
              📧 A confirmation email has been sent to your registered email address.
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleCopy}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-green-500 text-green-600 rounded-lg font-medium hover:bg-green-50 transition"
            >
              <FaCopy className="text-lg" />
              {copied ? "Copied!" : "Copy Booking ID"}
            </button>

            <button
              onClick={handleSaveImage}
              disabled={isSaving}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-50"
            >
              <FaDownload className="text-lg" />
              {isSaving ? "Downloading..." : "Download Receipt"}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Success;
