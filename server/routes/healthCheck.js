const express = require("express");
const router = express.Router();
const { healtCheck } = require("../controllers/healthCheckController");

router.get("/", healtCheck);

module.exports = router;
