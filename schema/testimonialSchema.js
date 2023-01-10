const mongoose = require("mongoose");

const testimonialSchema = mongoose.Schema({
  name: {
    type: String,
  },
  company: {
    type: String,
  },
  website: {
    type: String,
  },
  designation: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  twitter: {
    type: String,
  },
  project: {
    type: String,
  },
  usability: {
    type: String,
  },
  enjoyed: {
    type: String,
  },
  improvement: {
    type: String,
  },
  feedback: {
    type: String,
  },
  rating: {
    type: Number,
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

module.exports = testimonialSchema;
