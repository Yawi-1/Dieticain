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
  }, []);

  return (
    <div className="p-4">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">📅 Bookings</h2>
        <input
          type="text"
          placeholder="🔍 Search by name..."
          className="w-full md:w-1/2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full min-w-[600px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left text-sm font-medium">Customer</th>
              <th className="p-3 text-left text-sm font-medium hidden md:table-cell">Email</th>
              <th className="p-3 text-left text-sm font-medium">Service</th>
              <th className="p-3 text-left text-sm font-medium hidden sm:table-cell">Price</th>
              <th className="p-3 text-left text-sm font-medium">Status</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-gray-200">
            {filteredBookings?.map((booking) => (
              <tr key={booking._id} className="hover:bg-gray-50">
                <td className="p-3 text-sm">{booking.name}</td>
                <td className="p-3 text-sm hidden md:table-cell">{booking.email}</td>
                <td className="p-3 text-sm">{booking.serviceId?.title}</td>
                <td className="p-3 text-sm hidden sm:table-cell">₹{booking.price?.toFixed(2)}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium 
                    ${booking.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                  >
                    {booking.paymentStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredBookings?.length === 0 && !status === 'loading' && (
        <p className="text-center text-gray-500 mt-6">No bookings found</p>
      )}
      {status === 'loading' && <Loader />}
    </div>
  );
};

export default Booking;