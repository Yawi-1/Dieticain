import React from 'react';
import Layout from '../components/Layout/Layout';
import { FaAppleAlt, FaGraduationCap, FaHandsHelping } from 'react-icons/fa';
import professional from '../../public/professional.png'
import cer1 from '../../public/cer1.jpg'
import cer2 from '../../public/cer2.png'
import cer3 from '../../public/Medal.png'

const About = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        {/* Main Content Container */}
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              Meet Our Expert Dietician
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Combining Science, Compassion, and Personalized Care
            </p>
          </div>

          {/* Profile Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Profile Image */}
            <div className="md:col-span-1">
              <img 
                className="rounded-lg shadow-xl w-full h-96 object-cover"
                src={professional}
                alt="Dietician Profile"
              />
            </div>

            {/* Biography */}
            <div className="md:col-span-2 prose lg:prose-xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Professional Biography</h2>
              <p className="text-gray-600 mb-4">
                With over 12 years of clinical experience, our lead dietician holds a Master's degree 
                in Nutritional Science and has helped thousands of clients achieve their health goals. 
                Specializing in metabolic disorders and sports nutrition, they combine evidence-based 
                practice with a holistic approach to wellness.
              </p>
              <p className="text-gray-600">
                Their work has been featured in several medical publications, and they regularly 
                conduct workshops on sustainable eating habits and preventive healthcare.
              </p>
            </div>
          </div>

          {/* Certifications Section */}
          <div className="bg-white py-12 px-4 rounded-lg shadow-lg mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              <FaGraduationCap className="inline-block mr-2 text-orange-400" />
              Certifications & Qualifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((cert) => (
                <div key={cert} className="group relative cursor-pointer">
                  <img
                    className="rounded-lg w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-105"
                    src={cer2}
                    alt={`Certification ${cert}`}
                  />
                  <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg" />
                </div>
              ))}
            </div>
          </div>

          {/* Approach Section */}
          <div className="bg-orange-50 rounded-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              <FaAppleAlt className="inline-block mr-2 text-orange-400" />
              Personalized Nutrition Approach
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="prose lg:prose-xl">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Methodology</h3>
                <ul className="list-decimal pl-6 space-y-4 text-gray-600">
                  <li>Comprehensive health assessment</li>
                  <li>DNA-based nutritional analysis</li>
                  <li>Personalized meal planning</li>
                  <li>Continuous progress monitoring</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Core Principles</h3>
                <div className="space-y-4">
                  {['Sustainability', 'Scientific Accuracy', 'Empathy', 'Preventive Care'].map((principle, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-orange-500 font-bold">{idx + 1}</span>
                      </div>
                      <span className="text-gray-600">{principle}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center py-12 px-4 bg-gray-900 rounded-lg shadow-xl">
            <h3 className="text-3xl font-bold text-white mb-4">
              <FaHandsHelping className="inline-block mr-2 text-orange-400" />
              Start Your Wellness Journey
            </h3>
            <p className="text-xl text-gray-300 mb-8">
              Book a consultation to receive your personalized nutrition plan
            </p>
            <button className="bg-orange-400 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-500 transition-colors duration-300 transform hover:scale-105">
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;