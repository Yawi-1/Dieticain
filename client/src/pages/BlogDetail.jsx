import React,{ useEffect }  from 'react'
import Layout from '../components/Layout/Layout'
import { Link,useParams  } from 'react-router-dom'
import { singleBlog } from '../Redux/blogSlice'
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../components/Modal/Loader'

const BlogDetail = () => {
    const {singleBlog:blog,status} = useSelector((state) => state.blog);
    console.log('Single Blog : ',blog)
    const dispatch = useDispatch();
    const { id } = useParams();
    useEffect(() => {
        dispatch(singleBlog(id));
    },[])
  return (
    <Layout>
         <div className="bg-white rounded-lg shadow-md p-6">
              <Link
                to='/blog'
                className="mb-4 text-green-800 hover:text-green-600"
              >
                ← Back to blogs
              </Link>
              <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <div className="prose max-w-none">{blog.content}</div>
              <div>Views : {blog.views}</div>

              {/* Comments Section */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-xl font-semibold mb-4">Comments</h3>
                <form onSubmit={'handleCommentSubmit'} className="mb-6">
                  <textarea
                    // value={newComment}
                    // onChange={(e) => setNewComment(e.target.value)}
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
                  {/* {comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                      <p>{comment.text}</p>
                    </div> */}
                  {/* ))} */}
                </div>
              </div>
              {status === 'pending' && <LinkLoader/>}
            </div>
    </Layout>
  )
}

export default BlogDetail