import { useEffect, useState } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";
import BlogFormModal from "../Modal/BlogModalForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, deleteBlog } from "../../Redux/blogSlice";
import Loader from "../Modal/Loader";
import DeleteModal from "../Modal/DeleteModal";
import { toast } from "react-toastify";

const BlogTable = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { blogs, status } = useSelector((state) => state.blog);
  const [isDelete, setDelete] = useState(false);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const handleDelete = async () => {
    const res = await dispatch(deleteBlog(isDelete));
    if (res.type === "blog/delete/fulfilled") {
      setDelete(false);
      toast("Blog deleted successfully");
    } else {
      toast("Please try again later...");
    }
  };

  return (
    <div className="p-2 md:p-6 w-96 md:w-full">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-800">
        📝 Blog Articles
      </h2>

      {/* Search and Add Blog */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="🔍 Search blog..."
          className="w-full md:w-1/3 px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="flex items-center gap-2 px-4 py-2 md:py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlus /> Add Blog
        </button>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full border-collapse min-w-max">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Comments</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBlogs.map((blog, index) => (
              <tr
                key={blog._id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition my-2`}
              >
                <td className="p-3">{blog.title}</td>
                <td className="p-3">{blog.category}</td>
                <td className="p-3">
                  {blog.content.length > 60
                    ? blog.content.slice(0, 60) + "..."
                    : blog.content}
                </td>
                <td className="p-3">
                {blog.comments.length} comments
                </td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => setDelete(blog._id)}
                    className="p-2 rounded-lg text-red-500 hover:text-white hover:bg-red-500 transition"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <BlogFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      {status === "loading" && <Loader />}
      <DeleteModal
        isOpen={isDelete}
        onClose={() => setDelete(false)}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default BlogTable;
