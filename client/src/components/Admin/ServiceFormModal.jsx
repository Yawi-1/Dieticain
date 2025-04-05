import React, { useState } from "react";
import { IoImageOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addService } from "../../Redux/serviceSlice";
import { useSelector } from "react-redux";
import Loader from "../Modal/Loader";
import {toast} from 'react-toastify'
const ServiceFormModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    duration: "",
  });
  const [preview, setPreview] = useState("");
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.service);

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    if (type === "file" && files.length > 0) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRemoveImage = () => {
    setPreview("");
    setFormData({ image: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });
    const res = await dispatch(addService(formDataToSend));
    if (res.type === "service/addService/fulfilled") {
      onClose();
      setFormData({
        title: "",
        description: "",
        price: "",
        image: "",
        duration: "",
      });
      toast("Service added suceesfully..");
    } else {
      toast("Error while adding service..! Please try again later...");
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-10 bg-black/50 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Add New Service
            </h2>
            <button
              className="text-gray-500 hover:text-gray-700 transition-colors"
              onClick={onClose}
              disabled={status == "pending"}
            >
              <MdClose className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service Title
                </label>
                <input
                  type="text"
                  name="title"
                  disabled={status == "pending"}
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter service title"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  disabled={status == "pending"}
                  rows="3"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter service description"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (₹)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  disabled={status == "pending"}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="0.00"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  disabled={status=='pending'}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="e.g., 2 hours"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl hover:border-indigo-500 transition-colors">
                  {!preview ? (
                    <label
                      htmlFor="image"
                      className="flex flex-col items-center justify-center h-48 cursor-pointer p-6"
                    >
                      <IoImageOutline className="w-12 h-12 text-gray-400 mb-3" />
                      <p className="text-gray-600 text-sm font-medium">
                        Click to upload image
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG up to 2MB
                      </p>
                    </label>
                  ) : (
                    <div className="relative h-48">
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
                      >
                        <MdClose className="w-5 h-5 text-red-600" />
                      </button>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleChange}
                  className="hidden"
                  accept="image/*"
                  disabled={status=='pending'}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {status === "pending" ? <div className="flex items-center justify-center gap-x-4">Adding <div className="w-6 h-6 rounded-full border-2 border-dashed animate-spin"></div></div> : "Add Service"} 
            </button>
          </form>
        </div>
      </div>
      {status === "pending" && <Loader />}
    </div>
  );
};

export default ServiceFormModal;
