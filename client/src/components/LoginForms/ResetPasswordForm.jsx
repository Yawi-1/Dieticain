import { useState } from "react";
import { FiLock } from "react-icons/fi";
import { verifyOtp } from "../../Redux/authSlice";

export default function ResetPasswordForm({ setStep, email,dispatch }) {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    dispatch(verifyOtp({email,otp,password:newPassword}))
    // Simulate verifying OTP and setting new password
    console.log("OTP:", otp, "New Password:", newPassword);
    setStep("login");
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl space-y-6">
      <h2 className="text-2xl font-bold text-center">Set New Password</h2>
      <p className="text-center text-sm text-gray-500">
        Enter OTP sent to <strong>{email}</strong>
      </p>

      <form className="space-y-4" onSubmit={handleUpdatePassword}>
        <input
          type="text"
          placeholder="Enter OTP"
          required
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border py-3 px-4 rounded-lg"
        />

        <div className="relative">
          <FiLock className="absolute left-3 top-3 text-gray-400" />
          <input
            type="password"
            required
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full pl-10 py-3 pr-4 border rounded-lg"
          />
        </div>

        <button className="w-full bg-green-600 text-white py-3 rounded-lg">
          Update Password
        </button>
      </form>
    </div>
  );
}
