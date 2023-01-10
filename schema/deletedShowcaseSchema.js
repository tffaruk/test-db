const maongoose = require("mongoose");

const deletedShowcaseSchema = maongoose.Schema({
  website: {
    type: String,
    required: true,
  },
  theme: {
    type: String,
    required: true,
  },
  generator: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = deletedShowcaseSchema;
