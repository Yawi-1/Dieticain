import React, { useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen w-full ">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="mt-16 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );  
};

export default AdminLayout;
