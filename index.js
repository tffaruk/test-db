const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const searchHandler = require("./router/searchRouter");
const showcaseHandler = require("./router/showcaseRouter");
const requestHandler = require("./router/requestRouter");
const testimonialHandler = require("./router/testimonialRouter");
const reviewHandler = require("./router/reviewRouter");
const bundleReviewHandler = require("./router/bundleReviewRouter");
const adminHandler = require("./router/adminRouter");
const { dbConnect } = require("./dbConnect");
const deletedShowcaseHandler = require("./router/deletedShowcaseRouter");
require("dotenv").config();
const { IPinfoWrapper } = require("node-ipinfo");

const ipinfo = new IPinfoWrapper();
// middleware
app.use(cors());
app.use(express.json({ limit: "50mb", extended: true }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(bodyParser.json());
app.set("view engine", "ejs");

// database connection
dbConnect();

// router
app.use("/search", searchHandler);
app.use("/showcase", showcaseHandler);
app.use("/request", requestHandler);
app.use("/testimonial", testimonialHandler);
app.use("/review", reviewHandler);
app.use("/bundle-review", bundleReviewHandler);
app.use("/admin", adminHandler);
app.use("/deleted-showcase", deletedShowcaseHandler);

// local api
app.get("/", async(req, res) => {
  // const ip = "116.206.89.13";
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(ip)
  const response=await ipinfo.lookupIp(ip)

res.send(response.country)
});

const port = process.env.PORT;

app.listen(port);
app.listen(() => {
  console.log(`server run on port http://localhost:${port}`);
});
