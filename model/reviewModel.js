const reviewSchema = require("../schema/reviewSchema");
const mongoose = require("mongoose");

const Review = new mongoose.model("Review", reviewSchema);

module.exports = Review;
