import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Confetti from "react-confetti";
import html2canvas from "html2canvas";
import { FaCheckCircle, FaCopy, FaDownload, FaTicketAlt } from "react-icons/fa";
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
          `http://localhost:8000/api/payment/razorpay/success?session_id=${sessionId}`
        )
        .then((res) => {
          setOrder(res.data.booking);
        })
        .catch((err) => {
          console.log(err);
          setError(err.response?.data?.error || "Something went wrong");
        })
        .finally(() => setLoading(false));
    }
  }, [sessionId, navigate]);

  const handleCopy = () => {
    navigator.clipboard.writeText(sessionId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveImage = async () => {
    window.print();
    // if (!ticketRef.current) return;
    // setIsSaving(true);
    // try {
    //   const canvas = await html2canvas(ticketRef.current, {
    //     useCORS: true,
    //     backgroundColor: "#ffffff",
    //   });
    //   const image = canvas.toDataURL("image/png");
    //   const link = document.createElement("a");
    //   link.href = image;
    //   link.download = "booking-ticket.png";
    //   link.click();
    // } catch (err) {
    //   console.error("Error saving image:", err);
    //   alert("Error saving image. Please try again.");
    // }
    // setIsSaving(false);
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-red-600 text-center py-10">{error}</div>;

  return (
    <Layout>
      <div className="min-h-screen bg-[#f0fdf4]">
        <Confetti recycle={false} numberOfPieces={400} gravity={0.2} />

        <div className="max-w-2xl mx-auto px-4 py-12 sm:py-16">
          <div className="text-center mb-10">
            <div className="mx-auto bg-green-500 w-24 h-24 rounded-full flex items-center justify-center mb-6">
              <FaCheckCircle className="text-white text-5xl animate-bounce" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Payment Successful! 🎉
            </h1>
            <p className="text-lg text-gray-600">
              Thank you,{" "}
              <span className="font-semibold text-green-600">
                {order?.name}
              </span>
              . Your booking for{" "}
              <span className="font-semibold">{order?.serviceId?.title}</span>{" "}
              is confirmed!
            </p>
          </div>

          {/* Ticket Card */}
          <div
            ref={ticketRef}
            className="rounded-xl shadow-2xl overflow-hidden border transform hover:scale-[1.01] transition-all"
            style={{
              backgroundColor: "#ffffff",
              color: "#1f2937", // text-gray-800
              borderColor: "#e5e7eb", // border-gray-200
            }}
          >
            <div className="relative p-8">
              <div className="flex items-center gap-3 mb-6">
                <FaTicketAlt className="text-green-600 text-3xl" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Booking Details
                </h2>
              </div>

              <div className="space-y-4 text-gray-700">
                <div className="flex justify-between items-center pb-2 border-b border-dashed border-gray-200">
                  <span className="font-medium">Booking ID:</span>
                  <span style={{ color: "#10b981" }}>{order?._id}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-dashed border-gray-200">
                  <span className="font-medium">Amount Paid:</span>
                  <span style={{ color: "#10b981" }}>
                    ₹{order?.price} /- INR
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-dashed border-gray-200">
                  <span className="font-medium">Service Mode:</span>
                  <span className="capitalize text-blue-600 bg-blue-100 px-3 py-1 rounded-full text-sm">
                    {order?.mode}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Contact Email:</span>
                  <span className="text-gray-600">{order?.email}</span>
                </div>
              </div>

              <div className="mt-8 bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 text-center">
                  Present this ID at the service location. A confirmation email
                  has been sent to your address.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleCopy}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-green-500 text-green-600 rounded-lg font-medium hover:bg-green-50 transition-colors"
            >
              <FaCopy className="text-lg" />
              {copied ? "Copied!" : "Copy Booking ID"}
            </button>

            <button
              onClick={handleSaveImage}
              disabled={isSaving}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              <FaDownload className="text-lg" />
              {isSaving ? "Downloading..." : "Print Ticket"}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Success;
