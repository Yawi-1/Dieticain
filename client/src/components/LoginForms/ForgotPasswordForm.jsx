import { FiArrowLeft, FiMail } from "react-icons/fi";
import { forgotpassword } from "../../Redux/authSlice";

export default function ForgotPasswordForm({ setStep, email, setEmail,dispatch }) {
  const handleSendResetLink = (e) => {
    e.preventDefault();

    console.log("Reset link sent to:", email);
     dispatch(forgotpassword(email))
    alert('Email otp sent');
    setStep("reset"); // Go to reset step
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl space-y-6 relative">
      <button onClick={() => setStep("login")} className="absolute top-4 left-4 text-gray-500">
        <FiArrowLeft />
      </button>
      <h2 className="text-2xl font-bold text-center">Reset Password</h2>
      <p className="text-center text-sm text-gray-500">
        Enter your email to receive a reset code
      </p>

      <form className="space-y-4" onSubmit={handleSendResetLink}>
        <div className="relative">
          <FiMail className="absolute left-3 top-3 text-gray-400" />
          <input
            type="email"
            required
            placeholder="you@example.com"
            className="w-full pl-10 pr-4 py-3 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="w-full bg-indigo-600 text-white py-3 rounded-lg">
          Send Reset Link
        </button>
      </form>
    </div>
  );
}
