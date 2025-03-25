import { useState } from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

const Booking = () => {
  const [search, setSearch] = useState("");
  const [bookings, setBookings] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@gmail.com",
      date: "2025-03-25",
      status: "Pending",
    },
    {
      id: 2,
      name: "Sarah Smith",
      email: "sarahsmith@yahoo.com",
      date: "2025-03-26",
      status: "Approved",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michaelbrown@outlook.com",
      date: "2025-03-27",
      status: "Canceled",
    },
  ]);

  const filteredBookings = bookings.filter((booking) =>
    booking.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">📅 Bookings</h2>

      {/* Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="🔍 Search by name..."
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
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking, index) => (
              <tr
                key={booking.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition`}
              >
                <td className="p-4">{booking.name}</td>
                <td className="p-4">{booking.email}</td>
                <td className="p-4">{booking.date}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full ${
                      booking.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : booking.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {booking.status}
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

export default Booking;
