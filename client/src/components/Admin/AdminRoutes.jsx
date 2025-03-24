import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from './AdminLayout/AdminLayout'
import Dashboard from "./Dashboard";
import Bookings from "./Booking";
import AddService from "./ServiceForm";
import Services from './Services'


const AdminRoutes = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/services" element={<Services />} />
        <Route path="/add" element={<AddService />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
