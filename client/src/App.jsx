import React, { useEffect, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { verifyAuth } from "./Redux/authSlice";
import socket from "./utils/socket";
import { addServiceFromSocket } from "./Redux/serviceSlice";
import { ToastContainer, toast } from "react-toastify";
import Loader from "./components/Modal/Loader";

// Home is imported normally to show instantly
import Home from "./pages/Home"; 

// Lazy-loaded pages
const About = React.lazy(() => import("./pages/About"));
const Services = React.lazy(() => import("./pages/Services"));
const ServiceDetail = React.lazy(() => import("./components/Services/ServiceDetail"));
const Blog = React.lazy(() => import("./pages/Blog"));
const BlogDetail = React.lazy(() => import("./pages/BlogDetail"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Login = React.lazy(() => import("./pages/Login"));
const Success = React.lazy(() => import("./pages/Success"));
const Cancel = React.lazy(() => import("./pages/Cancel"));
const AdminRoutes = React.lazy(() => import("./components/Admin/AdminRoutes"));
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
      <Routes>
        {/* Home loads instantly */}
        <Route path="/" element={<Home />} />

        {/* Suspense for lazy-loaded routes */}
        <Route
          path="*"
          element={
            <Suspense fallback={<Loader />}>
              <Routes>
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
          }
        />
      </Routes>

      <ToastContainer 
      theme="dark"
      position="top-center"
      />
    </>
  );
};

export default App;
