const mongoose = require("mongoose");

const bundleReviewSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  subject: {
    type: String,
  },
  rating: {
    type: Number,
  },
  feedback: {
    type: String,
  },
  weight: {
    type: Number,
  },
  published: {
    type: Boolean,
  },
  trash: {
    type: Boolean,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = bundleReviewSchema;
