const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const testimonialHandler = require("./testimonialRouter");

const showcaseHandler = require("./showcaseRouter");
const adminHandler = require("./adminRouter");
const reviewHandler = require("./reviewRouter");

require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.set("view engine", "ejs");
const port = 7003;

// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("connection"))
//   .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello");
});
app.listen(process.env.PORT || port);

app.use("/showcase", showcaseHandler);
app.use("/testimonial", testimonialHandler);
app.use("/admin", adminHandler);
app.use("/review", reviewHandler);
