import React from "react";
const ServiceCard = ({ service }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-200">
      {/* <img className="aspect-square w-full rounded-md" src={service.image} alt="" /> */}
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
        {service.title}
      </h3>
      <p className="text-gray-600 mb-4">{service.description}</p>
      <div className="mb-4">
        <span className="text-lg font-bold text-indigo-600">
          {service.price}
        </span>
        <span className="text-gray-500 ml-2">({service.duration})</span>
      </div>
      <button
        className="inline-block w-full bg-black text-white text-center py-2 px-4 rounded-lg hover:bg-gray-900 transition-colors duration-300"
      >
        Book Now
      </button>
      <a
        className="text-blue-600 hover:bg-blue-600 hover:text-white duration-300 text-center my-2 px-4 py-2 rounded-md bg-white block"
        href=""
      >
        Know More
      </a>
    </div>
  );
};

export default ServiceCard;
