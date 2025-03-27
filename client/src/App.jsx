import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./components/Services/ServiceDetail";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import AdminRoutes from "./components/Admin/AdminRoutes";
import { verifyAuth } from "./Redux/authSlice";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";

const App = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  // To Verify User Authentication 
  useEffect(() => {
    dispatch(verifyAuth()); 
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/services/:id" element={<ServiceDetail />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/success" element={<Success />} />
      <Route path="/cancel" element={<Cancel />} />
      <Route path="/login" element={user ? <Navigate to="/admin" replace /> : <Login />} />
      <Route path="/admin/*" element={user ? <AdminRoutes /> : <Navigate to="/login" replace />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
