const mongoose = require("mongoose");

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
  views:{
    type:Number,
    default:0
  }
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
