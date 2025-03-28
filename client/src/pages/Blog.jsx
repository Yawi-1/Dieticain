import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../Redux/blogSlice";

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedblog, setSelectedblog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.blog);
  const categories = ['all',...new Set(blogs.map(blog=> blog.category))];

  const filteredblogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, { id: comments.length + 1, text: newComment }]);
      setNewComment("");
    }
  };

  useEffect(() => {
    dispatch(fetchBlogs());
  }, []);
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Search and Filter */}
        <section className="bg-gray-100 py-6">
          <div className="container mx-auto px-4">
            <input
              type="text"
              placeholder="Search blogs..."
              className="w-full p-3 rounded-lg border-2 border-green-800 mb-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="flex flex-wrap gap-2 ">
              {categories.map((category) => (
                <button
                  key={category._id}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 capitalize rounded-full border ${
                    selectedCategory === category
                      ? "bg-green-800 text-white border-green-800"
                      : "bg-white border-green-800 text-green-800"
                  } transition`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* blog Grid */}
        <main className="container mx-auto px-4 py-8">
          {!selectedblog ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredblogs.map((blog) => (
                <blog
                  key={blog.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedblog(blog)}
                >
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <span className="inline-block bg-green-200 text-green-800 text-sm px-3 py-1 rounded-full mb-2">
                      {blog.category}
                    </span>
                    <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                    <p className="text-gray-600">
                      {blog.content.substring(0, 100)}...
                    </p>
                  </div>
                </blog>
              ))}
            </div>
          ) : (
            /* blog Detail */
            <div className="bg-white rounded-lg shadow-md p-6">
              <button
                onClick={() => setSelectedblog(null)}
                className="mb-4 text-green-800 hover:text-green-600"
              >
                ← Back to blogs
              </button>
              <h1 className="text-3xl font-bold mb-4">{selectedblog.title}</h1>
              <img
                src={selectedblog.image}
                alt={selectedblog.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <div className="prose max-w-none">{selectedblog.content}</div>

              {/* Comments Section */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-xl font-semibold mb-4">Comments</h3>
                <form onSubmit={handleCommentSubmit} className="mb-6">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full p-3 border rounded-lg mb-2"
                    placeholder="Add your comment..."
                    rows="3"
                  />
                  <button
                    type="submit"
                    className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Post Comment
                  </button>
                </form>
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                      <p>{comment.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
}
