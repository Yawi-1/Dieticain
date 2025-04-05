import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
import Loader from "./components/Modal/Loader";
import BlogDetail from "./pages/BlogDetail";
import socket from "../src/utils/socket";
import { addServiceFromSocket } from "./Redux/serviceSlice";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  const dispatch = useDispatch();
  const { user, isInitialized } = useSelector((state) => state.auth);

  // Verify authentication on initial load
  useEffect(() => {
    dispatch(verifyAuth());
  }, [dispatch]);

  //(modify the useEffect for socket)
  useEffect(() => {
    const handleConnect = () => {
      console.log("🟢 Connected to Socket.IO server:", socket.id);
    };

    const handleDisconnect = () => {
      console.log("🔴 Disconnected from Socket.IO server");
    };

    const handleNewService = async (newService) => {
      console.log("📦 New service received:", newService);
      const res = await dispatch(addServiceFromSocket(newService));
      toast.success("New Service added..");
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("new-service", handleNewService);

    // Cleanup on unmount
    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("new-service", handleNewService);
    };
  }, [dispatch]);

  // Show loader until auth state is initialized
  if (!isInitialized) return <Loader />;

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/admin" replace /> : <Login />}
        />
        <Route
          path="/admin/*"
          element={user ? <AdminRoutes /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer/>
    </>
  );
};

export default App;
