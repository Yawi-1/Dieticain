const uploadSingleImage = require("../middlewares/upload.js");
const {
  addBlog,
  getAllBlogs,
  getBlogById,
  deleteBlog,
  addComment,
} = require("../controllers/blog.controllers.js");
const authenticate = require("../middlewares/authMiddleware.js");

const { Router } = require("express");

const router = Router();
router.post("/", uploadSingleImage, addBlog);
router.post('/add-comment',addComment)
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.delete("/:id", deleteBlog);

module.exports = router;
