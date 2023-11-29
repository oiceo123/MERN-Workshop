// import packages
const slugify = require("slugify");
const blogs = require("../models/blogModel");
const { v4: uuidv4 } = require("uuid");

// ErrCode
const createErr = "blog-001";

// บันทึกข้อมูล
const create = (req, res) => {
  const { title, content, author } = req.body;
  let slug = slugify(title);

  if (!slug) {
    slug = uuidv4();
  }

  // validate
  switch (true) {
    case !title:
      return res.status(400).json({
        trace_id: createErr,
        error: "กรุณาป้อนชื่อบทความ",
      });
    case !content:
      return res.status(400).json({
        trace_id: createErr,
        error: "กรุณาป้อนเนื้อหาบทความ",
      });
  }

  // save data
  blogs.create({ title, content, author, slug }, (err, result) => {
    if (err) {
      return res.status(400).json({
        trace_id: createErr,
        error: "มีชื่อบทความซ้ำกัน",
      });
    }
    res.status(201).json(result);
  });
};

// ดึงข้อมูลบทความทั้งหมด
const getAllBlogs = (req, res) => {
  blogs.find({}).exec((err, blogs) => {
    res.status(200).json(blogs);
  });
};

// ดึงข้อมูลบทความที่สนใจอ้างอิงตาม slug
const singleBlog = (req, res) => {
  const { slug } = req.params;
  blogs.findOne({ slug }).exec((err, blog) => {
    res.status(200).json(blog);
  });
};

module.exports = { create, getAllBlogs, singleBlog };
