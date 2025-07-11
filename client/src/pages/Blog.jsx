import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../Redux/blogSlice";
import { Link } from "react-router-dom";
import Loader from "../components/Modal/Loader";

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const dispatch = useDispatch();
  const { blogs, status } = useSelector((state) => state.blog);
  const categories = ["all", ...new Set(blogs.map((blog) => blog.category))];

  const filteredblogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    dispatch(fetchBlogs());
    window.scrollTo(0, 0);
  }, []);

  // Show loading state while fetching blogs
  if (status === 'loading') {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50">
          <section className="bg-gray-100 py-6">
            <div className="container mx-auto px-4">
              <div className="h-12 bg-gray-200 rounded mb-4"></div>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="h-8 bg-gray-200 rounded-full w-20"></div>
                ))}
              </div>
            </div>
          </section>
          <main className="container mx-auto px-4 py-8">
            <Loader type="blog-skeleton" />
          </main>
        </div>
      </Layout>
    );
  }

  // Show error state if data fetching failed
  if (status === 'failed') {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Failed to load blogs</h2>
            <button 
              onClick={() => dispatch(fetchBlogs())}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Try Again
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <section className="bg-gray-100  py-6">
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
          {blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredblogs.map((blog) => (
                <Link data-aos='zoom-up-right' to={`/blog/${blog._id}`} className="rounded-md">
                  <blog
                    key={blog._id}
                    
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
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
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-700">
                No blogs available at the moment
              </h3>
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
}
