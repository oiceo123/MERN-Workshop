const express = require("express");
const router = express.Router();
const {
  create,
  getAllBlogs,
  singleBlog,
} = require("../controllers/blogController");

router.get("/blog", getAllBlogs);
router.get("/blog/:slug", singleBlog);
router.post("/blog/create", create);

module.exports = router;
