const express = require("express");
const Admin = require("../model/adminModel");
const adminHandler = express.Router();
const checkToken = require("../AuthToken/checkAuth");
const { deleteFunction } = require("../utils");
const adminController = require("../controller/adminController");
// get and insert admin
adminHandler
  .route("/")
  .post(checkToken, adminController.insertAdmin)
  .get(checkToken, adminController.getAllAdmin);
// delete admin
adminHandler.get("/delete/:id", checkToken, async (req, res) => {
  deleteFunction(Admin, req);
  res.redirect("/");
});

// update admin
adminHandler.put("/update", checkToken, adminController.updateAdmin);
module.exports = adminHandler;
