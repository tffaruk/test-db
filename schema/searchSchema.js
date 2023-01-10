const mongoose = require("mongoose");

const searchSchema = mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  page_url: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = searchSchema;
