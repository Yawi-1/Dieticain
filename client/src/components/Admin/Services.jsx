import { useState } from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

const Services = () => {
  const [search, setSearch] = useState("");
  const [services, setServices] = useState([
    {
      id: 1,
      name: "Weight Loss Program",
      price: "$150",
      duration: "3 Months",
      status: "Active",
    },
    {
      id: 2,
      name: "Muscle Gain Plan",
      price: "$200",
      duration: "4 Months",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Personalized Diet Plan",
      price: "$100",
      duration: "1 Month",
      status: "Active",
    },
  ]);

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">💼 Services</h2>

      {/* Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="🔍 Search service..."
          className="w-full md:w-1/3 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <th className="p-4 text-left">Service Name</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Duration</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredServices.map((service, index) => (
              <tr
                key={service.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition`}
              >
                <td className="p-4">{service.name}</td>
                <td className="p-4">{service.price}</td>
                <td className="p-4">{service.duration}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full ${
                      service.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {service.status}
                  </span>
                </td>
                <td className="p-4 flex gap-2">
                  <button className="p-2 rounded-lg text-blue-500 hover:text-white hover:bg-blue-500 transition">
                    <FaEye />
                  </button>
                  <button className="p-2 rounded-lg text-yellow-500 hover:text-white hover:bg-yellow-500 transition">
                    <FaEdit />
                  </button>
                  <button className="p-2 rounded-lg text-red-500 hover:text-white hover:bg-red-500 transition">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Services;
