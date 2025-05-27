import { useState } from "react";
import Layout from "../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft } from "react-icons/fi";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { loading, error } = useSelector((state) => state.auth);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(login(formData));
    if (res.type === "auth/login/fulfilled") {
      toast.success(`Welcome back, ${formData.email}!`);
      navigate("/admin");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md transform transition-all duration-300">
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 relative">
            {/* Back Button for Forgot Password */}
            {isForgotPassword && (
              <button
                onClick={() => setIsForgotPassword(false)}
                className="absolute top-4 left-4 text-gray-500 hover:text-blue-600 transition-colors"
              >
                <FiArrowLeft className="w-6 h-6" />
              </button>
            )}

            {/* Header Section */}
            <div className="text-center space-y-2">
              <div className="mx-auto bg-gradient-to-br from-blue-600 to-indigo-700 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                <FiLock className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">
                {isForgotPassword ? "Reset Password" : "Welcome Back"}
              </h2>
              <p className="text-gray-500">
                {isForgotPassword
                  ? "Enter your email to reset password"
                  : "Please sign in to continue"}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 p-3 rounded-lg flex items-center text-red-700 text-sm">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error.message}
              </div>
            )}

            {/* Form Section */}
            <form className="space-y-4" onSubmit={isForgotPassword ? null : handleLoginSubmit}>
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              {/* Password Input (Only in Login Mode) */}
              {!isForgotPassword && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="••••••••"
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>
              )}

              {/* Forgot Password Link */}
              {!isForgotPassword && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsForgotPassword(true)}
                    className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-all transform hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white rounded-full animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : isForgotPassword ? (
                  "Send Reset Link"
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}