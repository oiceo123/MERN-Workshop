// Import packages
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config(); // load config in .env file

// Import routes
const healtCheck = require("./routes/healthCheck");
const blogRoute = require("./routes/blog");

const app = express();

mongoose.set("strictQuery", false);

// connect cloud database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });

// middleware
app.use(express.json()); // set parser json
app.use(cors()); // set cors
app.use(morgan("dev")); // set logging

// route
app.use("/api", healtCheck);
app.use("/api", blogRoute);

// listen
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`server listen on http://localhost:${port}/api`);
});
