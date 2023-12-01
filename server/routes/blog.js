const express = require("express");
const router = express.Router();
const {
  create,
  getAllBlogs,
  singleBlog,
  update,
  remove,
} = require("../controllers/blogController");
const { requireLogin } = require("../controllers/authController");

router.get("/blog", getAllBlogs);
router.get("/blog/:slug", singleBlog);
router.post("/blog/create", requireLogin, create);
router.put("/blog/:slug", requireLogin, update);
router.delete("/blog/:slug", requireLogin, remove);

module.exports = router;
