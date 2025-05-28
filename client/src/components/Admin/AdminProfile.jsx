import React, { useEffect, useRef, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux'
import { FaPen } from "react-icons/fa";
import {updateUser} from '../../Redux/authSlice'
import { verifyAuth } from '../../Redux/authSlice';
import {toast} from 'react-toastify'

const AdminProfile = () => {

  const { user,loading } = useSelector(state => state.auth);
const [admin, setAdmin] = useState({ name: '', email: '' ,profile:''});
let username;

useEffect(() => {
  if (user) {
    setAdmin({
      name: user.name || '',
      email: user.email || '',
      profile:user.profile || ''
    });
    username = user.name;
  }
}, [user]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [image, setImage] = useState(null);

  const inputRef = useRef(null);
 const dispatch = useDispatch();

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      const file = e.target.files[0];
      setAdmin({ ...admin, [e.target.name]: file });
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl)
    } else {
      setAdmin({ ...admin, [e.target.name]: e.target.value });
    }
  };

  const handleUpdate = () => {
    setIsUpdate(true);
    inputRef.current.focus();
  }

  const handleSave = () => {
  const formData = new FormData();
  formData.append('name', admin.name);
  formData.append('email', admin.email);
  if(image){
    formData.append('profile', admin.profile);
  }
  
  dispatch(updateUser(formData))
    .unwrap()
    .then(() => {
      setIsUpdate(false); 
      toast.success('Profile updated Successfully...')
    })
    .catch((error) => {
      console.error('Update failed:', error);
    });
};


  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Admin Profile</h2>

      <div className="flex items-center gap-6 relative">
        {

          isUpdate && <label htmlFor="image" className='absolute left-20 top-10 cursor-pointer w-6 h-6 rounded-full flex items-center justify-center bg-white'>
            <FaPen size={16} />
            <input type="file" className='hidden' name="profile" onChange={handleChange} id="image" /></label>
        }

        <img
          src={image || admin.profile}
          alt="Admin Avatar"
          className="w-24 h-24 rounded-full object-cover border-2 border-primary"
        />
        <div>
          <h3 className="text-xl font-medium">{user?.name}</h3>
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
        disabled={loading}
          onClick={!isUpdate ? handleUpdate : handleSave}
          className={`mt-4 ${isUpdate ? 'bg-green-600' : 'bg-blue-600'} text-white px-5 py-2 rounded-lg hover:bg-green-700 transition`}
        >
          {isUpdate ? (loading ? 'Loading....' : 'Save Changes') : 'Edit Profile'}
        </button>
      </div>
    </div>
  );
};

export default AdminProfile;
