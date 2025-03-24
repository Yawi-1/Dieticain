import { useState } from "react";
import Layout from "../components/Layout/Layout";
export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login Successful!"); // Replace with actual authentication logic
    setFormData({ username: "", password: "" });
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-4">Admin Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full p-2 border rounded-md"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-2 border rounded-md"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
              Login
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
