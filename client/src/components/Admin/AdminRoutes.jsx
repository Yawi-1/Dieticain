import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from './AdminLayout/AdminLayout'
import Dashboard from "./Dashboard";
import Bookings from "./Booking";
import ServiceTable from './ServiceTable'
import BlogTable from './BlogTable'
import Contact from './Contact'
import AdminProfile from "./AdminProfile";
 


const AdminRoutes = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/services" element={<ServiceTable />} />
        <Route path="/blogs" element={<BlogTable />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<AdminProfile />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
