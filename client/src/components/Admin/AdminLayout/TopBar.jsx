import React from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const TopBar = ({toggleSidebar }) => {
  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-white  flex items-center justify-between px-4 z-30">
      {/* Sidebar Toggle Button */}

      <div className="flex gap-6">
      <button
        onClick={toggleSidebar}
        className="text-blue-600 hover:text-blue-800 transition-colors"
      >
        <FaBars size={24} />
      </button>
      <Link to='/' className="text-xl font-bold text-blue-600">Nutri Care</Link>
      </div>

      <div className="w-8"></div>
    </div>
  );
};

export default TopBar;
