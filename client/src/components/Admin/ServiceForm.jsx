import React, { useState } from "react";
import { IoImageOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addService } from "../../Redux/serviceSlice";
import AdminLayout from "./AdminLayout/AdminLayout";

const ServiceForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    duration: "",
  });
  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
  
    if (type === "file" && files.length > 0) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));
  
      // Correct way to create an object URL
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  
  

  

  const handleRemoveImage = () => {
    setPreview("");
    setFormData({ ...formData, image: "" });
  };

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Convert state object into FormData for file upload
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("duration", formData.duration);
    
    if (formData.image) {
      formDataToSend.append("image", formData.image); // Append file
    }
  
    // Dispatch the action
    dispatch(addService(formDataToSend));
  };
  

  return (


   <div className="min-h-[calc(100vh-4rem)] bg-gray-50  md:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl bg-white rounded-xl shadow-sm">
        <div className="p-6 md:p-8 lg:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
            Add New Service
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Title */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
                  placeholder="Enter service title"
                  required
                />
              </div>

              {/* Description */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
                  placeholder="Enter service description"
                  required
                />
              </div>

              {/* Price & Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (₹)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
                  placeholder="0.00"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
                  placeholder="e.g., 2 hours"
                  required
                />
              </div>

              {/* Image Upload */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Image
                </label>
                {!preview ? (
                  <label
                    htmlFor="image"
                    className="flex flex-col items-center justify-center h-64 rounded-xl border-2 border-dashed border-gray-300 hover:border-indigo-500 transition-colors cursor-pointer"
                  >
                    <IoImageOutline className="w-16 h-16 text-gray-400 mb-4" />
                    <p className="text-gray-600 font-medium">
                      Click to upload image
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      PNG, JPG up to 2MB
                    </p>
                  </label>
                ) : (
                  <div className="relative group">
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-full p-1.5 shadow-lg hover:bg-red-100 transition-colors"
                    >
                      <MdClose className="w-6 h-6 text-red-600" />
                    </button>
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-xl border border-gray-200"
                    />
                  </div>
                )}
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleChange}
                  className="hidden"
                  accept="image/*"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add Service
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServiceForm;
