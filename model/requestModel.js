const requestSchema = require("../schema/requestSchema");
const mongoose = require("mongoose");

const Request = new mongoose.model("Request", requestSchema);

module.exports = Request;
