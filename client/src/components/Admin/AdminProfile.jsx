import React, { useRef, useState } from 'react';
import {useSelector} from 'react-redux'
import { FaPen } from "react-icons/fa";

const AdminProfile = () => {
  
  const {user} = useSelector(state=>state.auth);
  const [admin, setAdmin] = useState(user);
  const [isUpdate,setIsUpdate] = useState(false);
  
  const inputRef = useRef(null);


  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };
  const handleUpdate = ()=>{
     setIsUpdate(true);
     inputRef.current.focus();
  }

  const handleSave = () => {
    console.log('Updated admin profile:', admin);
    // Add API call here if needed
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Admin Profile</h2>
      
      <div className="flex items-center gap-6 relative">
        {

       isUpdate &&  <label htmlFor="image" className='absolute left-20 top-10 cursor-pointer w-6 h-6 rounded-full flex items-center justify-center bg-white'><FaPen size={16}/><input type="file" className='hidden'  id="image"/></label>
        }
         
        <img
          src={"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
          alt="Admin Avatar"
          className="w-24 h-24 rounded-full object-cover border-2 border-primary"
        />
        <div>
          <h3 className="text-xl font-medium">{admin.name}</h3>
          <p className="text-gray-600">Admin</p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="name"
            value={admin.name}
            onChange={handleChange}
            ref={inputRef}
            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
            disabled={!isUpdate}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={admin.email}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
            readOnly
          />
        </div>
        <button
          onClick={!isUpdate ? handleUpdate : handleSave}
          className= {`mt-4 ${isUpdate ? 'bg-green-600' :'bg-blue-600'} text-white px-5 py-2 rounded-lg hover:bg-green-700 transition`}
        >
          {isUpdate ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>
    </div>
  );
};

export default AdminProfile;
