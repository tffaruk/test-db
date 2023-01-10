const testimonialSchema = require("../schema/testimonialSchema");
const mongoose = require("mongoose");

const Testimonial = new mongoose.model("Testimonial", testimonialSchema);

module.exports = Testimonial;
