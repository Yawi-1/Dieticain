import React from "react";
import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { FaServicestack, FaBars } from "react-icons/fa6";
import { TbBrandBooking } from "react-icons/tb";
import { IoLogOut } from "react-icons/io5";
import {useDispatch} from 'react-redux'
import {logout} from '../../../Redux/authSlice'

const Sidebar = ({ isOpen,setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const sidebarData = [
    { link: "/", icon: <MdDashboard />, text: "Dashboard" },
    { link: "/bookings", icon: <TbBrandBooking />, text: "Bookings" },
    { link: "/add", icon: <IoIosAddCircle />, text: "Add Service" },
    { link: "/services", icon: <FaServicestack />, text: "Services" },
  ];

  const handleLogout  = ()=>{
    dispatch(logout());
    alert('Logout Successfully...')
  }

  return (
    <div
      className={`fixed  ${!isOpen && '-left-16'} md:left-0 md:relative h-full bg-white shadow-md transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
     

      {/* Sidebar Menu */}
      <nav className="flex md:hidden flex-col my-16">
        {sidebarData.map((item) => (
          <NavLink
          onClick={()=> setIsSidebarOpen(!isOpen)}
            key={item.link}
            to={`/admin${item.link}`}
            className={ 
              `flex items-center p-3 m-2 font-semibold transition-colors 
                shadow-md shadow-blue-400 hover:bg-blue-700  rounded hover:text-white 
              }`
            }
          >
            <span className="text-2xl">{item.icon}</span>
            {isOpen && <span className="ml-4">{item.text}</span>}
          </NavLink>
        ))}
      </nav>
      <nav className="hidden md:flex flex-col my-16">
        {sidebarData.map((item) => (
          <NavLink
            key={item.link}
            to={`/admin${item.link}`}
            className={ 
              `flex items-center p-3 m-2 font-semibold transition-colors 
                shadow-md shadow-blue-600  hover:bg-blue-700  rounded hover:text-white 
              }`
            }
          >
            <span className="text-2xl">{item.icon}</span>
            {isOpen && <span className="ml-4">{item.text}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Logout Button */}
      <button onClick={handleLogout} className="flex items-center w-full p-3 shadow  mt-auto rounded-lg text-red-600 hover:bg-red-100">
        <IoLogOut className="text-2xl" />
        {isOpen && <span className="ml-4">Logout</span>}
      </button>
    </div>
  );
};

export default Sidebar;
