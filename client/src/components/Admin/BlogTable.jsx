import { useState } from "react";
import { FaEdit, FaTrash, FaEye, FaPlus } from "react-icons/fa";
import BlogFormModal from '../Modal/BlogModalForm'

const BlogTable = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "5 Quick Mediterranean Diet Meals",
      category: "Healthy Recipes",
      content: "Discover delicious and nutritious meals...",
      image: "https://via.placeholder.com/600x400",
    },
    {
      id: 2,
      title: "Wellness Tips for a Balanced Life",
      category: "Wellness",
      content: "Simple daily habits to improve well-being...",
      image: "https://via.placeholder.com/600x400",
    },
  ]);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">📝 Blog Articles</h2>

      {/* Search and Add Blog */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="🔍 Search blog..."
          className="w-full md:w-1/3 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="flex items-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlus /> Add Blog
        </button>
      </div>

      {/* Blog Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBlogs.map((blog, index) => (
              <tr
                key={blog.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition`}
              >
                <td className="p-4">{blog.title}</td>
                <td className="p-4">{blog.category}</td>
                <td className="p-4 flex gap-2">
                  <button className="p-2 rounded-lg text-blue-500 hover:text-white hover:bg-blue-500 transition">
                    <FaEye />
                  </button>
                  <button className="p-2 rounded-lg text-yellow-500 hover:text-white hover:bg-yellow-500 transition">
                    <FaEdit />
                  </button>
                  <button className="p-2 rounded-lg text-red-500 hover:text-white hover:bg-red-500 transition">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <BlogFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default BlogTable;
