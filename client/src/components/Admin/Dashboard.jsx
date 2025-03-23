import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import LogIn from "../../pages/LogIn";
import AdminLayout from "../Admin/AdminLayout";
const Dashboard = () => {
  return (
    <AdminLayout>
      <h1>Dashboard</h1>
     
      <Routes>
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </AdminLayout>
  );
};

export default Dashboard;
