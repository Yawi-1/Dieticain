import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { Link, useParams } from 'react-router-dom';
import { singleBlog, addComment } from '../Redux/blogSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Modal/Loader';
import { toast } from "react-toastify";

const BlogDetail = () => {
  const { singleBlog: blog, status } = useSelector((state) => state.blog);
  const [comment, setComment] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(singleBlog(id));
  }, [dispatch, id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.warn('Enter a valid email address');
      return;
    }
    if (comment.length < 5) {
      toast.warn('Comment should be at least 5 characters long');
      return;
    }
    if (comment.length > 50) {
      toast.warn('Comment should not exceed 50 characters');
      return;
    }
    const commentData = {
      blogId: blog._id,
      email,
      comment
    };
    dispatch(addComment(commentData));
    setComment('');
    setEmail('');
  };

  return (
    <Layout>
      {status === 'pending' && <Loader />}

      <div className="container mx-auto px-4 py-8">
        <Link
          to="/blog"
          className="text-green-700 hover:text-green-900 mb-4 inline-block"
        >
          ← Back to Blogs
        </Link>

        <div className="text-right font-medium text-sm text-gray-500 mb-4">
          Views: {blog?.views || 0}
        </div>

        <div className="flex flex-col lg:flex-row lg:gap-8">
          {/* Blog Content */}
          <div className="lg:w-2/3">
            <img
              src={blog?.image}
              alt={blog?.title}
              className="w-full h-72 sm:h-96 object-cover rounded-xl shadow mb-6"
            />
            <h1 className="text-2xl sm:text-4xl font-bold text-center text-gray-800 mb-4">
              {blog?.title}
            </h1>
            <hr className="mb-6" />
            <div className="prose prose-lg max-w-none bg-white p-6 rounded-lg shadow text-gray-800 leading-relaxed">
              {blog?.content}
            </div>
          </div>

          {/* Comments */}
          <div className="lg:w-1/3 mt-8 lg:mt-0">
            <div className="space-y-6">
              {/* Comment Form */}
              <div className="bg-gray-50 p-4 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-4">Add a Comment</h3>
                <form onSubmit={handleCommentSubmit}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border rounded-lg mb-4 outline-none focus:ring-2 focus:ring-green-800"
                  />
                  <textarea
                    rows="4"
                    placeholder="Write your comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full p-3 border rounded-lg mb-4 outline-none focus:ring-2 focus:ring-green-800"
                  />
                  <button
                    type="submit"
                    className="w-full bg-green-800 text-white py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Post Comment
                  </button>
                </form>
              </div>

              {/* Comment List */}
              <div className="bg-gray-50 p-4 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-4">
                  Comments ({blog?.comments?.length || 0})
                </h3>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  {blog?.comments?.map((item) => (
                    <div
                      key={item._id}
                      className="p-3 bg-white rounded-md shadow-sm"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-8 h-8 rounded-full bg-green-800 text-white flex items-center justify-center">
                          {item?.email?.charAt(0).toUpperCase()}
                        </span>
                        <p className="text-sm font-medium">{item.email}</p>
                      </div>
                      <p className="text-gray-700 text-sm">{item.comment}</p>
                      <span className="text-xs text-gray-400">
                        Posted on: {new Date().toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogDetail;
