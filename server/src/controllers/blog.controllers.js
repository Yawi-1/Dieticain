const Blog = require("../models/blog.model.js");
const uploadOnCloudinary = require("../utils/cloudinary.js");
const getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await Blog.find({});
    res.status(200).json({ message: "All blogs fetched ", data: allBlogs });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const addBlog = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "Please upload a file" });
    }
    const imageUrl = await uploadOnCloudinary(file);
    const newBlog = await new Blog({
      title,
      content,
      category,
      image: imageUrl || "",
    });
    await newBlog.save();
    res
      .status(201)
      .json({ message: "Blog created successfully", data: newBlog });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findByIdAndDelete(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog deleted successfully", data: blog });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    blog.views += 1;
    await blog.save();
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog fetched successfully", data: blog });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addComment = async(req,res)=>{
  try {
      const {blogId,email,comment} = req.body;
      const blog = await Blog.findById(blogId);
      if(!blogId){
        return res.status(400).json({message:'Blog doesn\'t exist',success:false})
      }
      const isEmail = blog.comments.some((item)=> item.email === email);
      if(isEmail){
        return res.status(400).json({message:'You can only add one comment ', success:false})
      }
      blog.comments.push({email,comment});
      await blog.save();
      return res.status(200).json({message:'New Comment Added',success:true, data:blog})
  } catch (error) {
    res.status(500).json({message:error.message,success:false})
  }
}


module.exports =  {getAllBlogs,addBlog,deleteBlog,getBlogById,addComment}