import { useState } from "react";
import Layout from "../components/Layout/Layout";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent Successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold text-center mb-4">Contact Us</h1>

        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full p-2 border rounded-md"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full p-2 border rounded-md"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              className="w-full p-2 border rounded-md"
              value={formData.subject}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              className="w-full p-2 border rounded-md h-32"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="max-w-3xl mx-auto mt-6 text-center">
          <p className="text-lg font-semibold">
            📍 Address: 123 Nutrition St, Wellness City
          </p>
          <p className="text-lg font-semibold">📞 Phone: +123 456 7890</p>
          <p className="text-lg font-semibold">
            📧 Email: contact@dietician.com
          </p>
        </div>

        {/* Google Map */}
        <div className="max-w-3xl mx-auto mt-6">
          <iframe
            className="w-full h-64 rounded-md shadow-md"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093686!2d144.95373631531695!3d-37.81627974202125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d5df1f7f579%3A0x4e6b062ed5f8c825!2sMelbourne%20CBD!5e0!3m2!1sen!2sau!4v1632380123456!5m2!1sen!2sau"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </Layout>
  );
}
