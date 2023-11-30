const express = require("express");
const router = express.Router();
const {
  create,
  getAllBlogs,
  singleBlog,
  update,
  remove,
} = require("../controllers/blogController");

router.get("/blog", getAllBlogs);
router.get("/blog/:slug", singleBlog);
router.post("/blog/create", create);
router.put("/blog/:slug", update);
router.delete("/blog/:slug", remove);

module.exports = router;
