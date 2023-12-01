const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");

const loginErr = "login-001";

exports.login = (req, res) => {
  const { username, password } = req.body;

  if (username === process.env.USERNAME1 && password === process.env.PASSWORD) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    return res.json({ token, username });
  } else {
    return res.status(400).json({
      trace_id: loginErr,
      error: "username หรือ password ไม่ถูกต้อง",
    });
  }
};

exports.requireLogin = expressjwt({
  secret: process.env.JWT_SECRET_KEY,
  algorithms: ["HS256"],
  userProperty: "auth",
});
