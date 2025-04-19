import React, { useEffect, lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { verifyAuth } from "./Redux/authSlice";
import socket from "./utils/socket";
import { addServiceFromSocket } from "./Redux/serviceSlice";
import { ToastContainer, toast } from "react-toastify";
import Loader from "./components/Modal/Loader";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./components/Services/ServiceDetail"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/Login"));
const Success = lazy(() => import("./pages/Success"));
const Cancel = lazy(() => import("./pages/Cancel"));
const AdminRoutes = lazy(() => import("./components/Admin/AdminRoutes"));
import BMICalculator from "./components/BmiCalculator";

const App = () => {
  const dispatch = useDispatch();
  const { user, isInitialized } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(verifyAuth());
  }, [dispatch]);

  useEffect(() => {
    const handleConnect = () => {
      console.log("🟢 Connected to Socket.IO server:", socket.id);
    };

    const handleDisconnect = () => {
      console.log("🔴 Disconnected from Socket.IO server");
    };

    const handleNewService = async (newService) => {
      console.log("📦 New service received:", newService);
      await dispatch(addServiceFromSocket(newService));
      toast.success("New Service added..");
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("new-service", handleNewService);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("new-service", handleNewService);
    };
  }, [dispatch]);

  if (!isInitialized) return <Loader />;

  return (
    <>
      <Suspense fallback={<Loader />}>
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
          <Route path="/bmi" element={<BMICalculator />} />
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
      </Suspense>
      <ToastContainer />
    </>
  );
};

export default App;
