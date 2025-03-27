import { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { login ,verifyEmailOtp} from "../Redux/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "yawimalik786@gmail.com", password: "123456" });
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const { loading,isEmailSent, error,otpExpires,message } = useSelector((state) => state.auth);


  // Handle timer for OTP expiration
  useEffect(() => {
    if (!isEmailSent || !otpExpires) return;

    const timer = setInterval(() => {
      setTimeLeft(Math.max(0, otpExpires - Math.floor(Date.now() / 1000)));
    }, 1000);

    return () => clearInterval(timer);
  }, [isEmailSent, otpExpires]);

  // Handle email/password submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
     const res = await dispatch(login(formData));

     console.log('DIspatch Response ',res)
     if(res.type === 'auth/login/fulfilled'){
       alert(`${res?.payload?.message} on ${formData.email}`)
     }
    
  };

  // Handle OTP verification
  const handleOTPSubmit = (e) => {
    e.preventDefault();
    dispatch(verifyEmailOtp({ email: formData.email, otp }))
      .unwrap()
      .then(() =>
      {
        alert('Looged in successfully .......')
        navigate("/admin")
      }
         
    );
  };

  // Handle OTP resend
  const handleResendOTP = () => {
    // dispatch(resendOTP(formData));
  };

  // Format timer display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              {isEmailSent ? "Verify OTP" : "Admin Login"}
            </h2>
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>

          {!isEmailSent ? (
            <form onSubmit={handleLoginSubmit} className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Send OTP
              </button>
            </form>
          ) : (
            <form onSubmit={handleOTPSubmit} className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm space-y-4">
                <div>
                  <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                    Enter OTP
                  </label>
                  <input
                    id="otp"
                    name="otp"
                    type="number"
                    inputMode="numeric"
                    required
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-center text-xl font-semibold"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.slice(0, 4))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Time remaining: {formatTime(timeLeft)}
                  </span>
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={timeLeft > 0 || loading}
                    className="text-sm text-blue-600 hover:text-blue-500 disabled:text-gray-400 disabled:cursor-not-allowed"
                  >
                    Resend OTP
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Verify OTP
              </button>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
}