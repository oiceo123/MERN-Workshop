exports.healtCheck = (req, res) => {
  res.json({
    name: process.env.NAME,
    version: process.env.VERSION,
  });
};
