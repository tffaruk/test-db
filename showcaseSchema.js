const mongoose = require("mongoose");

const showcaseSchema = mongoose.Schema({
  title: {
    type: String,
  },
  slug: {
    type: String,
  },
  website: {
    type: String,
  },
  theme: {
    type: String,
  },
  featured: {
    type: Boolean,
  },
  draft: {
    type: Boolean,
  },
  trash: {
    type: Boolean,
  },
  weight: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = showcaseSchema;
