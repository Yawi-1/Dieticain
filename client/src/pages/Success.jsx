import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Confetti from "react-confetti";
import html2canvas from "html2canvas";
import { FaCheckCircle, FaCopy, FaDownload, FaTicketAlt } from "react-icons/fa";

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
        }
        if (sessionId) {
            axios.get(`http://localhost:3001/api/payment/verify-payment?session_id=${sessionId}`)
                .then(response => {
                    setOrder(response.data.booking);
                    setLoading(false);
                })
                .catch(err => {
                    setError(err.response?.data?.error || "Something went wrong");
                    setLoading(false);
                });
        }
    }, [sessionId, navigate]);

    const handleSaveImage = async () => {
        if (!ticketRef.current) return;
        
        setIsSaving(true);
        try {
            const canvas = await html2canvas(ticketRef.current, {
                useCORS: true,
                scale: 2,
                logging: true,
                backgroundColor: null,
                allowTaint: true
            });

            canvas.toBlob((blob) => {
                const link = document.createElement("a");
                link.download = `ticket-${order.paymentId.slice(-6)}.png`;
                link.href = URL.createObjectURL(blob);
                link.click();
                URL.revokeObjectURL(link.href);
            }, "image/png");
        } catch (err) {
            console.error("Failed to save image:", err);
            alert("Failed to save ticket. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleCopyPaymentId = () => {
        navigator.clipboard.writeText(order.paymentId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-red-100 p-8 rounded-lg max-w-md text-center">
                <h2 className="text-2xl text-red-600 font-bold mb-4">Error!</h2>
                <p className="text-red-700">{error}</p>
                <button 
                    onClick={() => navigate("/")}
                    className="mt-4 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                    Return Home
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f0f5ff] to-[#f8f0ff] p-6">
            <Confetti numberOfPieces={300} gravity={0.15} />
            
            <div ref={ticketRef} className="relative bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg border-4 border-dashed border-[#bfdbfe]">
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                    <FaTicketAlt className="text-4xl text-[#3b82f6] bg-white p-1 rounded-full" />
                </div>
                
                <div className="text-center mb-6">
                    <FaCheckCircle className="text-6xl text-[#22c55e] mx-auto mb-4 animate-bounce" />
                    <h1 className="text-3xl font-bold text-[#1e293b] mb-2">Payment Successful! 🎉</h1>
                    <p className="text-lg text-[#475569]">Your booking is confirmed</p>
                </div>

                <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center p-3 bg-[#f8fafc] rounded-lg">
                        <span className="font-semibold">Name:</span>
                        <span className="text-[#334155]">{order.name}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-[#f8fafc] rounded-lg">
                        <span className="font-semibold">Service ID:</span>
                        <span className="text-[#334155]">{order.serviceId}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-[#f8fafc] rounded-lg">
                        <span className="font-semibold">Amount Paid:</span>
                        <span className="text-[#22c55e] font-bold">₹{order.price}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-[#f8fafc] rounded-lg">
                        <span className="font-semibold">Payment ID:</span>
                        <div className="flex items-center gap-2 max-w-[60%]">
                            <span className="text-[#334155] truncate">{order.paymentId}</span>
                            <button 
                                onClick={handleCopyPaymentId}
                                className="text-[#3b82f6] hover:text-[#2563eb] flex-shrink-0"
                                title="Copy Payment ID"
                            >
                                <FaCopy />
                            </button>
                        </div>
                    </div>
                </div>

                {copied && (
                    <div className="mb-4 text-[#22c55e] text-sm text-center animate-bounce">
                        Copied to clipboard! ✅
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                        onClick={handleSaveImage}
                        disabled={isSaving}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-[#3b82f6] text-white rounded-lg hover:bg-[#2563eb] transition disabled:opacity-50"
                    >
                        <FaDownload /> 
                        {isSaving ? 'Saving...' : 'Save Ticket'}
                    </button>
                    <button 
                        onClick={() => navigate("/dashboard")}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-[#8b5cf6] text-white rounded-lg hover:bg-[#7c3aed] transition"
                    >
                        Go to Dashboard
                    </button>
                </div>

                <div className="mt-6 text-center text-sm text-[#64748b]">
                    🎫 Present this ticket at the time of service
                </div>
            </div>

            <div className="mt-8 text-center text-[#64748b] text-sm">
                Need help? 📧 Contact support@example.com
            </div>
        </div>
    );
};

export default Success;