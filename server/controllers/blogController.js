// import packages
const slugify = require("slugify");
const blogs = require("../models/blogModel");
const { v4: uuidv4 } = require("uuid");

// ErrCode
const createErr = "blog-001";
const updateErr = "blog-002";

// บันทึกข้อมูล
const create = (req, res) => {
  const { title, content } = req.body;
  let { author } = req.body;

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
    case !title.trim():
      return res.status(400).json({
        trace_id: createErr,
        error: "กรุณาป้อนชื่อบทความ",
      });
    case !content.trim():
      return res.status(400).json({
        trace_id: createErr,
        error: "กรุณาป้อนเนื้อหาบทความ",
      });
  }

  if (!author || !author.trim()) {
    author = "Admin";
  }

  let slug = slugify(title);

  if (!slug) {
    slug = uuidv4();
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

const remove = (req, res) => {
  const { slug } = req.params;
  blogs.findOneAndRemove({ slug }).exec((err, blog) => {
    if (err) console.log(err);
    res.status(200).json({
      message: "ลบบทความเรียบร้อย",
    });
  });
};

const update = (req, res) => {
  const { slug } = req.params;
  const { title, content } = req.body;
  let { author } = req.body;

  // validate
  switch (true) {
    case !title:
      return res.status(400).json({
        trace_id: updateErr,
        error: "กรุณาป้อนชื่อบทความ",
      });
    case !content:
      return res.status(400).json({
        trace_id: updateErr,
        error: "กรุณาป้อนเนื้อหาบทความ",
      });
    case !title.trim():
      return res.status(400).json({
        trace_id: updateErr,
        error: "กรุณาป้อนชื่อบทความ",
      });
    case !content.trim():
      return res.status(400).json({
        trace_id: updateErr,
        error: "กรุณาป้อนเนื้อหาบทความ",
      });
  }

  if (!author || !author.trim()) {
    author = "Admin";
  }

  blogs
    .findOneAndUpdate({ slug }, { title, content, author }, { new: true })
    .exec((err, blog) => {
      if (err) {
        return res.status(500).json({
          trace_id: updateErr,
          error: "เกิดข้อผิดพลาด",
        });
      }
      res.status(200).json(blog);
    });
};

module.exports = { create, getAllBlogs, singleBlog, remove, update };
