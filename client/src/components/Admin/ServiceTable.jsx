import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaEye, FaPlus } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { fetchService } from "../../Redux/serviceSlice";
import ServiceFormModal from "./ServiceFormModal";
import Loader from "../../components/Modal/Loader";
import DeleteModal from "../Modal/DeleteModal";
import { deleteService } from "../../Redux/serviceSlice";

const ServiceTable = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { services, status } = useSelector((state) => state.service);
  const [isDelete, setDelete] = useState(false);
 

  useEffect(() => {
    dispatch(fetchService());
  }, [dispatch]);

  const filteredServices = services?.filter((service) =>
    service.title.toLowerCase().includes(search.toLowerCase())
  );
  
  const handleDelete = async ()=>{
    const res = await dispatch(deleteService(isDelete));
    if(res.type === 'service/delete/fulfilled'){
      setDelete(false);
      alert('Service deleted successfully');
      onClose();
    }
    else{
      alert('Please try again later ...?');
    }
  }

  return (
    <div className="p-4 md:p-6 w-full">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-800">
        💼 Services
      </h2>

      {/* Search and Add Service */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="🔍 Search service..."
          className="w-full md:w-1/3 px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="flex items-center gap-2 px-4 py-2 md:py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlus /> Add Service
        </button>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full border-collapse min-w-max">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <th className="p-3 text-left">Service Name</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Duration</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredServices.map((service, index) => (
              <tr
                key={service._id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition`}
              >
                <td className="p-3">{service.title}</td>
                <td className="p-3">₹ {service.price.toFixed(2)}/-</td>
                <td className="p-3">{service.duration}</td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => setDelete(service._id)}
                    className="p-2 rounded-lg text-red-500 hover:text-white hover:bg-red-500 transition"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ServiceFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      {status === "loading" && <Loader />}
      <DeleteModal
        isOpen={isDelete}
        handleDelete={handleDelete}
        onClose={() => setDelete(false)}
      />
    </div>
  );
};

export default ServiceTable;
