const uploadSingleImage = require("../middlewares/upload.js");
const {
  addBlog,
  getAllBlogs,
  getBlogById,
  deleteBlog,
} = require("../controllers/blog.controllers.js");
const authenticate = require("../middlewares/authMiddleware.js");

const { Router } = require("express");

const router = Router();
router.post("/", uploadSingleImage, addBlog);
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.delete("/:id", authenticate, deleteBlog);

module.exports = router;
