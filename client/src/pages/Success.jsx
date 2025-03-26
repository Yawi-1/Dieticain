import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Confetti from "react-confetti";

const Success = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const [order, setOrder] = useState(null);
    console.log(order)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!sessionId) {
            window.location.href = "/";
        }
        if (sessionId) {
            axios.get(`http://localhost:3000/api/payment/verify-payment?session_id=${sessionId}`)
                .then(response => {
                    setOrder(response.data.booking);
                    setLoading(false);
                })
                .catch(err => {
                    setError(err.response?.data?.error || "Something went wrong");
                    setLoading(false);
                });
        }
    }, [sessionId]);

    if (loading) return <h2 className="text-2xl text-center mt-10 animate-ping">Verifying Payment...</h2>;
    if (error) return <h2 className="text-2xl text-red-500 text-center mt-10">Error: {error}</h2>;

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-6">
            <Confetti />
            <div className="bg-white shadow-lg rounded-lg p-8 text-center w-full max-w-md">
                <h1 className="text-3xl font-bold text-green-500">Payment Successful 🎉</h1>
                <p className="mt-4 text-lg">Thank you, <strong>{order.name}</strong>!</p>
                <p className="mt-2">Your booking for <strong>Service ID: {order.serviceId}</strong> is confirmed.</p>
                <p className="mt-2 font-semibold">Amount Paid: <span className="text-green-500">₹{order.price}</span></p>
                <p className="mt-2 text-sm text-gray-600">Payment ID: {order.paymentId}</p>
                <button 
                    onClick={() => window.location.href = "/dashboard"}
                    className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all"
                >
                    Go to Dashboard
                </button>
            </div>
        </div>
    );
};

export default Success;
