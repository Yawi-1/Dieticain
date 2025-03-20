import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../Layout/Layout';
import FAQAccordion from './FAQAccordion ';
import BookingModal from '../Modal/BookingModal'
const services = [
  {
    id: 1,
    title: "Personalized Meal Plans",
    description: "Customized nutrition plans tailored to your health goals, dietary preferences, and lifestyle. Includes weekly check-ins and adjustments.",
    price: "$149/month",
    duration: "Ongoing support",
    image: "https://images.unsplash.com/photo-1543363136-3fdb62e11be5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  }
];

const ServiceDetail = () => {
  const { id } = useParams();
  const service = services.find(service => service.id === parseInt(id));
  const [showModal, setShowModal] = React.useState(false);

  if (!service) {
    return <div className="text-center py-20">Service not found</div>;
  }

  const handleSubmit = ()=>{
    alert('Success')
  }

  return (
    <Layout>
       <BookingModal
       isOpen={showModal}
       onClose = {()=>setShowModal(false)}
       service={service}
       handleSubmit={handleSubmit}
       />
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Link to="/services" className="text-indigo-600 hover:text-indigo-800 mb-4 inline-block">
          &larr; Back to Services
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="relative h-96 md:h-auto">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Section */}
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {service.title}
              </h1>
              
              <div className="mb-6">
                <span className="text-2xl font-bold text-indigo-600">
                  {service.price}
                </span>
                <span className="ml-2 text-gray-500">
                  ({service.duration})
                </span>
              </div>

              <p className="text-gray-600 text-lg mb-8">
                {service.description}
              </p>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  What's Included:
                </h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Customized weekly meal plans</li>
                  <li>Grocery shopping list</li>
                  <li>Weekly progress check-ins</li>
                  <li>24/7 chat support</li>
                  <li>Recipe database access</li>
                </ul>
              </div>

              <div className="mt-8">
                <button onClick={()=>setShowModal(true)} className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-300 text-lg">
                  Book This Service
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">FAQ</h3>
            <FAQAccordion/>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Service Details</h3>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-gray-500">Duration</dt>
                <dd className="font-medium">{service.duration}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Support</dt>
                <dd className="font-medium">24/7 Availability</dd>
              </div>
              <div>
                <dt className="text-gray-500">Format</dt>
                <dd className="font-medium">Online & In-person</dd>
              </div>
              <div>
                <dt className="text-gray-500">Diet Types</dt>
                <dd className="font-medium">All dietary needs</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default ServiceDetail;