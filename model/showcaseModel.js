const showcaseSchema = require("../schema/showcaseSchema");
const mongoose = require("mongoose");

const Showcase = new mongoose.model("Showcase", showcaseSchema);

module.exports = Showcase;
