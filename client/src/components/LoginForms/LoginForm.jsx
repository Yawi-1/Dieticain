import { useState } from "react";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import {login} from '../../Redux/authSlice'
export default function LoginForm({ dispatch, loading, error, setStep, onSuccess, setEmail }) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await dispatch(login(formData));
    if (res.type === "auth/login/fulfilled") {
      setEmail(formData.email);
      onSuccess(formData.email);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl space-y-6">
      <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
       <p className="text-center text-sm text-gray-500">
        Sign in using email and password
      </p>
      {error && (
        <div className="bg-red-100 p-3 rounded text-sm text-red-700">
          {error.message}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleLogin}>
        <div className="relative">
          <FiMail className="absolute left-3 top-3 text-gray-400" />
          <input
            type="email"
            required
            placeholder="you@example.com"
            className="w-full pl-10 pr-4 py-3 border rounded-lg"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="relative">
          <FiLock className="absolute left-3 top-3 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            required
            placeholder="••••••••"
            className="w-full pl-10 pr-10 py-3 border rounded-lg"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        <div className="flex justify-between items-center text-sm">
          <button
            type="button"
            className="text-blue-600"
            onClick={() => setStep("forgot")}
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
