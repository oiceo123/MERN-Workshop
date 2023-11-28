// import packages
const slugify = require("slugify");
const blogs = require("../models/blogModel");

// ErrCode
const createErr = "blog-001";

// บันทึกข้อมูล
exports.create = (req, res) => {
  const { title, content, author } = req.body;
  const slug = slugify(title);

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
        error: err,
      });
    }
    res.status(201).json(result);
  });
};
