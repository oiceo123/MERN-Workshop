const express = require("express");
const router = express.Router();
const {
  create,
  getAllBlogs,
  singleBlog,
  remove,
} = require("../controllers/blogController");

router.get("/blog", getAllBlogs);
router.get("/blog/:slug", singleBlog);
router.post("/blog/create", create);
router.delete("/blog/:slug", remove);

module.exports = router;
