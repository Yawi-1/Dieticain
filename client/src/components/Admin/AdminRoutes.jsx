import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from './AdminLayout/AdminLayout'
import Dashboard from "./Dashboard";
import Bookings from "./Booking";
import ServiceTable from './ServiceTable'
import BlogTable from './BlogTable'


const AdminRoutes = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/services" element={<ServiceTable />} />
        <Route path="/blogs" element={<BlogTable />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
