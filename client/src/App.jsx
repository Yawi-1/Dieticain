import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./components/Services/ServiceDetail";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Login from './pages/Login'
import AdminRoutes from './components/Admin/AdminRoutes'
const App = () => {
  const isLogin = false;
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/services/:id" element={<ServiceDetail />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/login" element={<Login />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/admin/*" element={isLogin ? <AdminRoutes /> : <Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;
