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


      <div className=" bg-gray-100 flex items-center justify-center md:p-4">
        <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Add New Service
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Service Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                placeholder="Enter service title"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                placeholder="Enter service description"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price (₹)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                placeholder="Enter price"
                required
              />
            </div>

            {/* Image Upload */}
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Service Image
              </label>

              {!preview ? (
                <label
                  htmlFor="image"
                  className="cursor-pointer flex justify-center rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-4"
                >
                  <div className="text-center">
                    <IoImageOutline size={72} className="text-gray-400" />
                    <p className="text-sm text-gray-600 mt-2">Upload Image</p>
                  </div>
                </label>
              ) : (
                <div className="relative mt-2">
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
                  >
                    <MdClose size={20} />
                  </button>
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full md:w-[80%] mx-auto aspect-square object-cover rounded-md border border-gray-200"
                  />
                  <p className="text-sm text-gray-500 mt-1 text-center">
                    Image Preview
                  </p>
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

            {/* Duration */}
            <div>
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-gray-700"
              >
                Duration
              </label>
              <input
                type="text"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                placeholder="e.g., 2 hours"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
            >
              Add Service
            </button>
          </form>
        </div>
      </div>
  );
};

export default ServiceForm;
