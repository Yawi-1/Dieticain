import { useState } from "react";
import Layout from "../components/Layout/Layout";

const articles = [
  {
    id: 1,
    title: "5 Quick Mediterranean Diet Meals",
    category: "healthy-recipes",
    content: "Discover delicious and nutritious meals...",
    image: "https://via.placeholder.com/600x400",
  },
  {
    id: 11,
    title: "5 Quick Mediterranean Diet Meals",
    category: "healthy-recipes",
    content: "Discover delicious and nutritious meals...",
    image: "https://via.placeholder.com/600x400",
  },
  {
    id: 3,
    title: "5 Quick Mediterranean Diet Meals",
    category: "wellness",
    content: "Discover delicious and nutritious meals...",
    image: "https://via.placeholder.com/600x400",
  },
];

const categories = [
  { id: "all", name: "All" },
  { id: "weight-loss", name: "Weight Loss" },
  { id: "healthy-recipes", name: "Healthy Recipes" },
  { id: "wellness", name: "Wellness Tips" },
];

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, { id: comments.length + 1, text: newComment }]);
      setNewComment("");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Search and Filter */}
        <section className="bg-gray-100 py-6">
          <div className="container mx-auto px-4">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full p-3 rounded-lg border-2 border-green-800 mb-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full border ${
                    selectedCategory === category.id
                      ? "bg-green-800 text-white border-green-800"
                      : "bg-white border-green-800 text-green-800"
                  } transition`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Article Grid */}
        <main className="container mx-auto px-4 py-8">
          {!selectedArticle ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedArticle(article)}
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <span className="inline-block bg-green-200 text-green-800 text-sm px-3 py-1 rounded-full mb-2">
                      {article.category}
                    </span>
                    <h2 className="text-xl font-semibold mb-2">
                      {article.title}
                    </h2>
                    <p className="text-gray-600">
                      {article.content.substring(0, 100)}...
                    </p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* Article Detail */
            <div className="bg-white rounded-lg shadow-md p-6">
              <button
                onClick={() => setSelectedArticle(null)}
                className="mb-4 text-green-800 hover:text-green-600"
              >
                ← Back to Articles
              </button>
              <h1 className="text-3xl font-bold mb-4">
                {selectedArticle.title}
              </h1>
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <div className="prose max-w-none">{selectedArticle.content}</div>

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
