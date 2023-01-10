const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  github: {
    type: String,
  },
  theme: {
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
  usertype: {
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

module.exports = reviewSchema;
