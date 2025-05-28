import React,{useEffect} from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { getContacts } from "../../../Redux/contactSlice";
import {
  BellIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
const TopBar = ({toggleSidebar }) => {
    const {contacts} = useSelector(state=>state.contact);
    const dispatch = useDispatch();
      useEffect(() => {
        dispatch(getContacts());
      }, []);
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

      <div className="">
         <div className="flex gap-4">
          <Link to='/admin/contact' className="relative p-2 rounded-full bg-gray-100 ">
            <BellIcon className="w-6 h-6 text-gray-600" />
            <span className="absolute top-0 right-0 text-red-400">{contacts.filter((item)=> item.status === 'pending').length}</span>
          </Link>
          <Link to='/admin/profile' className="p-2 rounded-full bg-gray-100">
            <UserIcon className="w-6 h-6 text-gray-600" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
