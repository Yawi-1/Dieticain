import { useState } from "react";
import Layout from "../components/Layout/Layout";
import { toast } from "react-toastify";
import { createContact } from "../Redux/contactSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const dispatch = useDispatch();
  const {status} = useSelector(state=>state.contact)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast("Message Sent Successfully!");
    dispatch(createContact(formData))
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
            <button disabled={status === 'pending'} className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
              {
                status ==='pending'? 'Sending...' : 'Submit'
              }
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
           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3424.231081745668!2d75.84796007504347!3d30.880195978491937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a825313ade647%3A0x8221aeeb0002f9ba!2sANSH%20InfoTech!5e0!3m2!1sen!2sin!4v1743143450741!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </Layout>
  );
}
