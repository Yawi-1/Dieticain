import React from "react";
import { Link } from "react-router-dom";

const HomeServiceCard = ({ title, description, image,id }) => (
  <div data-aos='zoom-in-up' className="flex flex-col transition-all h-full shadow-md rounded-md slide">
  <div className="overflow-hidden">
    <img 
      src={image} 
      alt={title} 
      className="w-full rounded-lg h-48 object-cover transition-transform duration-300 group-hover:scale-110"
    />
  </div>
  <div className="p-6 flex flex-col flex-grow">
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 mb-4 flex-grow">{description}</p>
    <Link 
      to={`/services/${id}`}
      className="w-36 bg-orange-400 text-white px-4 py-2 rounded-full hover:bg-orange-500 transition-colors duration-200 mt-auto"
    >
      Read More ...
    </Link>
  </div>
</div>

);

export default HomeServiceCard;
