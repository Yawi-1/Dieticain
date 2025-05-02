const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  category: {
    type: String,
  },
  content: {
    type: String,
  },
  image: {
    type: String,
  },
  views: {
    type: Number,
    default: 0,
  },
  comments: [commentSchema], 
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
