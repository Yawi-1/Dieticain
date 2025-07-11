import React, { useEffect, Suspense, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { verifyAuth } from "./Redux/authSlice";
import { fetchService } from "./Redux/serviceSlice";
import { fetchBlogs } from "./Redux/blogSlice";
import socket from "./utils/socket";
import { addServiceFromSocket } from "./Redux/serviceSlice";
import { addContactFromSocket } from "./Redux/contactSlice";
import { ToastContainer, toast } from "react-toastify";
import Loader from "./components/Modal/Loader";
import BMICalculator from "./components/BmiCalculator";

// Eagerly loaded critical pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

// Lazy-loaded non-critical pages
const ServiceDetail = React.lazy(() =>
  import("./components/Services/ServiceDetail")
);
const Blog = React.lazy(() => import("./pages/Blog"));
const BlogDetail = React.lazy(() => import("./pages/BlogDetail"));
const Login = React.lazy(() => import("./pages/Login"));
const Success = React.lazy(() => import("./pages/Success"));
const Cancel = React.lazy(() => import("./pages/Cancel"));
const AdminRoutes = React.lazy(() => import("./components/Admin/AdminRoutes"));
const Chatbot = React.lazy(() => import("./components/Chatbot/Chatbot"));

const App = () => {
  const dispatch = useDispatch();
  const { user, isInitialized } = useSelector((state) => state.auth);
  const location = useLocation();
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    // Initialize auth and preload critical data
    const initializeApp = async () => {
      await dispatch(verifyAuth());
      
      // Preload critical data in parallel
      Promise.all([
        dispatch(fetchService()),
        dispatch(fetchBlogs())
      ]).catch(console.error);
    };

    initializeApp();

    const handleConnect = () => {
      console.log("🟢 Connected to Socket.IO server:", socket.id);
    };
    const handleDisconnect = () => {
      console.log("🔴 Disconnected from Socket.IO server");
    };
    const handleNewService = async (newService) => {
      await dispatch(addServiceFromSocket(newService));
      toast.success("New Service added.");
    };
    const handleContact = async (newContact) => {
      console.log("Socket Contact:", newContact);
      await dispatch(addContactFromSocket(newContact));
      toast.success("New Contact added.");
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("new-service", handleNewService);
    socket.on("new-contact", handleContact);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("new-service", handleNewService);
      socket.off("new-contact", handleContact);
    };
  }, [dispatch]);

  // Show loading until auth is initialized
  useEffect(() => {
    if (isInitialized) {
      // Small delay to ensure smooth transition
      setTimeout(() => setIsAppReady(true), 500);
    }
  }, [isInitialized]);

  if (!isAppReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-emerald-100"></div>
            <div className="absolute inset-0 rounded-full animate-spin border-4 border-emerald-600 border-t-transparent"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">NutriCare</h2>
          <p className="text-gray-600">Loading your health journey...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        {/* Eager pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/bmi" element={<BMICalculator />} />

        {/* Lazy-loaded pages with Suspense */}
        <Route
          path="/services/:id"
          element={
            <Suspense fallback={<Loader />}>
              <ServiceDetail />
            </Suspense>
          }
        />
        <Route
          path="/blog"
          element={
            <Suspense fallback={<Loader />}>
              <Blog />
            </Suspense>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <Suspense fallback={<Loader />}>
              <BlogDetail />
            </Suspense>
          }
        />
        <Route
          path="/success"
          element={
            <Suspense fallback={<Loader />}>
              <Success />
            </Suspense>
          }
        />
        <Route
          path="/cancel"
          element={
            <Suspense fallback={<Loader />}>
              <Cancel />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={<Loader />}>
              {user ? <Navigate to="/admin" replace /> : <Login />}
            </Suspense>
          }
        />
        <Route
          path="/admin/*"
          element={
            <Suspense fallback={<Loader />}>
              {user ? <AdminRoutes /> : <Navigate to="/login" replace />}
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Chatbot visible on public pages only */}
      {!location.pathname.startsWith("/admin") && (
        <Suspense fallback={null}>
          <Chatbot />
        </Suspense>
      )}

      <ToastContainer theme="dark" position="top-center" />
    </>
  );
};

export default App;
