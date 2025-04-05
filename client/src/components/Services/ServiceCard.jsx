import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BookingModal from "../Modal/BookingModal";
const ServiceCard = ({ service }) => {
  const[isShow, setShow] = useState(false);
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-200">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
        {service.title}
      </h3>
      <p className="text-gray-600 mb-4 md:min-h-24 h-36">{service.description}</p>
      <div className="mb-4">
        <span className="text-lg font-bold text-indigo-600">
          ₹{service.price.toFixed(2)}/
        </span>
        <span className="text-gray-500 ml-2">({service.duration})</span>
      </div>
      <button
        onClick={() => setShow(true)}
        className="inline-block w-full bg-black text-white text-center py-2 px-4 rounded-lg hover:bg-gray-900 transition-colors duration-300"
      >
        Book Now
      </button>
      <Link
        className="text-blue-600 hover:bg-blue-600 hover:text-white duration-300 text-center my-2 px-4 py-2 rounded-md bg-white block"
        to={`/services/${service._id}`}
      >
        Know More
      </Link>
      <BookingModal
        isOpen={isShow}
        onClose={() => setShow(false)}
        service={service}
      />
    </div>
  );
};

export default ServiceCard;
