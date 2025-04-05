import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings } from "../../Redux/bookingSlice";
import Loader from "../../components/Modal/Loader";

const Booking = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { bookings, status } = useSelector((state) => state.booking);

  const filteredBookings = bookings?.filter((booking) =>
    booking.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  return (
    <div className="p-2 md:p-6 w-full">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">📅 Bookings</h2>

      {/* Search */}
      <div className="mb-6 flex flex-col sm:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="🔍 Search by name..."
          className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full min-w-max border-collapse">
          <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <tr>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left hidden md:table-cell">Email</th>
              <th className="p-3 text-left">Service</th>
              <th className="p-3 text-left hidden sm:table-cell">Price</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings?.map((booking, index) => (
              <tr
                key={booking._id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition`}
              >
                <td className="p-3 text-sm">{booking.name}</td>
                <td className="p-3 text-sm hidden md:table-cell">{booking.email}</td>
                <td className="p-3 text-sm">{booking.serviceId?.title}</td>
                <td className="p-3 text-sm hidden sm:table-cell">₹{booking.price?.toFixed(2)}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium 
                    ${
                      booking.paymentStatus === "paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {booking.paymentStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredBookings?.length === 0 && status !== "loading" && (
        <p className="text-center text-gray-500 mt-6">No bookings found</p>
      )}

      {status === "loading" && <Loader />}
    </div>
  );
};

export default Booking;
