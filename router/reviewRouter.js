const express = require("express");
const Review = require("../model/reviewModel");
const reviewHandler = express.Router();
require("dotenv").config();
const checkToken = require("../AuthToken/checkAuth");
const { deleteFunction } = require("../utils");
const reviewController = require("../controller/reviewController");

// get and post review router
reviewHandler
  .route("/")
  .post(checkToken, reviewController.insertReview)
  .get(checkToken, reviewController.getAllReview);

// Update field
reviewHandler.put("/update", checkToken, reviewController.updateReview);

// get and update trash data
reviewHandler
  .route("/trash")
  .get(checkToken, reviewController.getReviewTrash)
  .put(checkToken, reviewController.updateReviewTrash);

// delete Review
reviewHandler.get("/delete/:id", checkToken, async (req, res) => {
  deleteFunction(Review, req);
  res.redirect("/");
});

module.exports = reviewHandler;
