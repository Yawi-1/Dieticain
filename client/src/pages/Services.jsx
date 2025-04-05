// Services.jsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Layout from "../components/Layout/Layout";
import ServiceCard from "../components/Services/ServiceCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchService } from "../Redux/serviceSlice";

const Services = () => {
  const { services } = useSelector((state) => state.service);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchService());
  }, [dispatch]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Service Overview */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
              Professional Nutrition Services
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Achieve your health goals with our comprehensive nutrition
              services. From personalized meal planning to educational
              workshops, we offer science-backed solutions tailored to your
              unique needs.
            </p>
          </motion.div>

          {/* Service Cards Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={service._id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-20 text-center"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Need Help Choosing?
              </h2>
              <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                Schedule a free 15-minute consultation to discuss your needs.
              </p>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="inline-block bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 px-8 rounded-xl text-lg font-medium hover:shadow-lg transition-all duration-300"
              >
                Request Consultation
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Services;