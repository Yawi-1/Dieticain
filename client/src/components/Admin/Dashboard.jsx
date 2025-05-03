import {
  BellIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  HeartIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { fetchBookings } from "../../Redux/bookingSlice";
import {fetchService} from "../../Redux/serviceSlice";
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";

export default function Dashboard() {
  const { bookings, status } = useSelector((state) => state.booking);
  const  {services}  = useSelector((state) => state.service);
  const totalRevenue = bookings.reduce((acc, booking) =>acc + booking.price, 0); 
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBookings());
    dispatch(fetchService());
  }, []);
  return (
    <div className="p-6 sm:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome Back, Admin😍
        </h1>
        <div className="flex gap-4">
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <BellIcon className="w-6 h-6 text-gray-600" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <UserIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Orders */}
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-400">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-50 rounded-lg">
              <ShoppingCartIcon className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold text-gray-800">
                {bookings.length}
              </p>
            </div>
          </div>
        </div>

        {/* Active Services */}
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-400">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <HeartIcon className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Services</p>
              <p className="text-2xl font-bold text-gray-800">{services.length}</p>
            </div>
          </div>
        </div>

        {/* Pending Consultations */}
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-amber-400">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-50 rounded-lg">
              <CalendarIcon className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending Consultations</p>
              <p className="text-2xl font-bold text-gray-800">5</p>
            </div>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-indigo-400">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-50 rounded-lg">
              <CurrencyDollarIcon className="w-6 h-6 text-indigo-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Sales</p>
              <p className="text-2xl font-bold text-gray-800">₹ {totalRevenue}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Monthly Consultations
        </h2>
        <div className="h-64 bg-gray-50 rounded-lg p-4">
          {/* Add your chart component here (e.g., ApexCharts, Recharts) */}
          <div className="flex items-center justify-center h-full text-gray-400">
            Chart placeholder
          </div>
        </div>
      </div>

      {/* Recent Appointments */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Appointments
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Client
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Service
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                {
                  name: "John Doe",
                  date: "2023-08-15",
                  service: "Nutrition Planning",
                  status: "upcoming",
                },
                {
                  name: "Jane Smith",
                  date: "2023-08-14",
                  service: "Diet Review",
                  status: "completed",
                },
                // Add more rows as needed
              ].map((appointment, index) => (
                <tr key={index}>
                  <td className="px-4 py-3 text-sm text-gray-800">
                    {appointment.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800">
                    {appointment.date}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800">
                    {appointment.service}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        appointment.status === "upcoming"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {appointment.status.charAt(0).toUpperCase() +
                        appointment.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
