import React from "react";
import { Link } from "react-router-dom";

const HomeServiceCard = ({ title, description, image,id }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
    <div className="overflow-hidden">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
      />
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link 
        to={`/services/${id}`}
        className="inline-block bg-orange-400 text-white px-4 py-2 rounded-full hover:bg-orange-500 transition-colors duration-200"
      >
        Learn More
      </Link>
    </div>
  </div>
);

export default HomeServiceCard;
