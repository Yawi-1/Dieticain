import React,{ useEffect,useState }  from 'react'
import Layout from '../components/Layout/Layout'
import { Link,useParams  } from 'react-router-dom'
import { singleBlog } from '../Redux/blogSlice'
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../components/Modal/Loader'
import {  toast } from "react-toastify";
import { addComment } from '../Redux/blogSlice'


const BlogDetail = () => {
    const {singleBlog:blog,status} = useSelector((state) => state.blog);
    const [comment,setComment] = useState('');
    const [email,setEmail] = useState('');
    const dispatch = useDispatch();
    const { id } = useParams();
    useEffect(() => {
        dispatch(singleBlog(id));
    },[]);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            toast.warn('Enter a valid  email address');
            return;
        }
        if(comment.length < 5){
            toast.warn('Comment should be at least 5 characters long');
            return;
        }
        if(comment.length > 30){
            toast.warn('Comment should not exceed 30 characters');
            return;
        }
        const commentData = {
            blogId: blog._id,
            email: email,
            comment: comment
        };
        const res = dispatch(addComment(commentData));
        console.log(res)
        setComment('');
        setEmail('');
    }
  return (
    <Layout>
      <div className="bg-white rounded-lg shadow-md p-6 md:flex md:gap-8">
        {/* Left Column - Blog Content */}
        <div className="md:flex-1">
          <Link
            to='/blog'
            className="mb-4 text-green-800 hover:text-green-600 inline-block"
          >
            ← Back to blogs
          </Link>
          
          <div className='font-bold text-right mb-4'>Views : {blog.views}</div>
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-96 object-cover rounded-lg mb-6"
          />
          <h1 className="md:text-3xl text-xl text-center font-bold mb-4">'' {blog.title} ''</h1>
          <hr className="mb-6" />
          <div className="prose max-w-none text-gray-700 font-semibold md:w-[90%] mx-auto p-4 bg-gray-50 rounded-lg">
            '{blog.content}'
          </div>
        </div>

        {/* Right Column - Comments Section */}
        <div className="md:w-[400px] md:min-w-[400px] mt-8 md:mt-0">
          <div className="space-y-6">
            {/* Comment Form */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Add New Comment</h3>
              <form onSubmit={handleCommentSubmit}>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" name="" className='w-full p-3 outline-none border rounded-lg mb-4 focus:ring-2 focus:ring-green-800' placeholder='Enter you email :' id="" />
                <textarea
                  className="w-full p-3 border rounded-lg outline-none  mb-4 focus:ring-2 focus:ring-green-800"
                  placeholder="Write your comment..."
                  rows="4"
                  value={comment}
                   onChange={(e)=>setComment(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-green-800 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition w-full"
                >
                  Post Comment
                </button>
              </form>
            </div>

            {/* Comments List */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Comments ({blog.comments?.length || 0})</h3>
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {blog?.comments?.map((item) => ( // Replace with actual comments data
                  <div key={'comment._id'} className="p-3 bg-white rounded-md shadow-xs">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-8 h-8 rounded-full bg-green-800 text-white flex items-center justify-center">
                        {item?.email?.charAt(0).toUpperCase()}
                      </span>
                      <p className="text-sm font-medium">{item.email}</p>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{item.comment}</p>
                    <span className="text-xs text-gray-400">
                      Posted On : {new Date(Date.now()).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {status === 'pending' && <Loader/>}
      </div>
    </Layout>
  )
}

export default BlogDetail