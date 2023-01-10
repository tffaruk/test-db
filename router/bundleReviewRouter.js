const express = require("express");
const BundleReview = require("../model/bundleReviewModel");
const bundleReviewHandler = express.Router();
require("dotenv").config();
const checkToken = require("../AuthToken/checkAuth");
const { deleteFunction } = require("../utils");
const bundleReviewController = require("../controller/bundleReviewController");

// get and post bundleReview router
bundleReviewHandler
  .route("/")
  .post(bundleReviewController.insertBundleReview)
  .get(checkToken, bundleReviewController.getAllBundleReview);

// Update field
bundleReviewHandler.put(
  "/update",
  checkToken,
  bundleReviewController.updateBundleReview
);

// get and update trash data
bundleReviewHandler
  .route("/trash")
  .get(checkToken, bundleReviewController.getBundleReviewTrash)
  .put(checkToken, bundleReviewController.updateBundleReviewTrash);

// delete BundleReview
bundleReviewHandler.get("/delete/:id", checkToken, async (req, res) => {
  deleteFunction(BundleReview, req);
  res.redirect("/");
});

module.exports = bundleReviewHandler;
