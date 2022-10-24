const reviewSchema = require("./reviewSchema");
const mongoose = require("mongoose");

const Review = new mongoose.model("Review", reviewSchema);

module.exports = Review;
