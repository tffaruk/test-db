const bundleReviewSchema = require("../schema/bundleReviewSchema");
const mongoose = require("mongoose");

const BundleReview = new mongoose.model("BundleReview", bundleReviewSchema);

module.exports = BundleReview;
