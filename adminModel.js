const mongoose = require("mongoose");
const adminSchema = require("./adminSchema");

const Admin = new mongoose.model("Admin", adminSchema);
module.exports = Admin;
