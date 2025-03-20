import React,{useEffect} from "react";
import Layout from "../components/Layout/Layout";
import ServiceCard from "../components/Services/ServiceCard";
import {  ServiceData } from "../assets/data";
import { Link } from "react-router-dom";
const Services = () => {

   



  useEffect(()=>{
    window.scrollTo(0,0)
},[])
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Service Overview */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Professional Nutrition Services
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Achieve your health goals with our comprehensive nutrition
              services. From personalized meal planning to educational
              workshops, we offer science-backed solutions tailored to your
              unique needs.
            </p>
          </div>

          {/* Service Card  */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ServiceData.map((service, index) => (
              <ServiceCard service={service} key={index+1}/>
            ))}
          </div>

          {/* Additional CTA */}
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Need Help Choosing?
            </h2>
            <p className="text-gray-600 mb-8">
              Schedule a free 15-minute consultation to discuss your needs.
            </p>
            <a
              href="#contact"
              className="bg-green-600 text-white py-3 px-8 rounded-lg text-lg hover:bg-green-700 transition-colors duration-300"
            >
              Request Consultation
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Services;
