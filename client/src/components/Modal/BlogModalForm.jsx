import React, { useState } from "react";
import { IoImageOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { addBlog } from "../../Redux/blogSlice";
import { useDispatch, useSelector } from "react-redux";

const BlogFormModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    image: "",
  });
  const [preview, setPreview] = useState("");
  const dispatch = useDispatch();

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
    setFormData({ ...formData, image: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    const res = await dispatch(addBlog(formDataToSend));
    console.log(res);
    if (res.type === 'blog/addBlog/fulfilled') {
      setFormData({
        title: "",
        category: "",
        content: "",
        image: "",
      });
      setPreview('')
      onClose();
      alert("Blog Added Successfully");
    }else{
      alert("Something went wrong !! Please try again later ..");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 bg-opacity-50 flex items-center justify-center p-2">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-4 md:p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Add New Blog Post
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <MdClose className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Blog Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter blog title"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="healthy-recipes">Healthy Recipes</option>
                  <option value="fitness-tips">Fitness Tips</option>
                  <option value="wellness">Wellness</option>
                </select>
              </div>

              {/* Content */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Blog Content
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Write your blog content..."
                  required
                />
              </div>

              {/* Image Upload */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Featured Image
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
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Publish Blog
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogFormModal;
