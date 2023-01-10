const mongoose = require("mongoose");
const deletedShowcaseSchema = require("../schema/deletedShowcaseSchema");

const DeletedShowcase = new mongoose.model(
  "Deleted_Showcase",
  deletedShowcaseSchema
);

module.exports = DeletedShowcase;
