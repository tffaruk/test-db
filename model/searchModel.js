const searchSchema = require("../schema/searchSchema");
const mongoose = require("mongoose");

const Search = new mongoose.model("Search", searchSchema);

module.exports = Search;
