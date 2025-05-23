import { useState } from "react";
import Layout from "../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState("password");

  const handleShowPassword = () => {
    if (password === "password") {
      setPassword("text");
    } else {
      setPassword("password");
    }
  };
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { loading, error } = useSelector((state) => state.auth);
  console.log(loading);

  // Handle email/password submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(login(formData));
    if (res.type === "auth/login/fulfilled") {
      toast(`${res?.payload?.message} on ${formData.email}`);
      navigate("/admin");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Admin Login
            </h2>
            {error && (
              <p className="mt-2 text-sm text-red-600">{error.message}</p>
            )}
          </div>

          <form onSubmit={handleLoginSubmit} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Enter your email"
                  className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={password}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  required
                  className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                {formData.password.length > 4 && (
                  <div className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      id="showpassword"
                      checked={password === "text"}
                      onChange={handleShowPassword}
                      className="mr-2"
                    />
                    <label
                      htmlFor="showpassword"
                      className="text-gray-800 font-semibold text-xs cursor-pointer"
                    >
                      {password === "text" ? "Hide" : "Show"} Password
                    </label>
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center gap-4 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? (
                <span className="w-6 h-6 border-2 rounded-full border-dashed animate-spin"></span>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
