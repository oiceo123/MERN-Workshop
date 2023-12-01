const jwt = require("jsonwebtoken");

const loginErr = "login-001";

const login = (req, res) => {
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

module.exports = { login };
