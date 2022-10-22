const express = require("express");
const dbConnect = require("./dbConnect");
const Admin = require("./adminModel");
const adminHandler = express.Router();

adminHandler.post("/", async (req, res) => {
  await dbConnect();
  const newData = new Admin(req.body);
  newData.save(req.body, (error) => {
    if (error) {
      console.log(error);
      res.status(500).json({
        error: "There is server side error",
      });
    } else {
      res.status(200).json({
        message: "Add user successfully",
      });
    }
  });
});

adminHandler.get("/", async (req, res) => {
  await dbConnect();
  await Admin.find({}).exec((err, data) => {
    if (err) {
      res.status(500).json({
        error: "the server side error",
      });
    } else {
      res.status(200).json({
        result: data,
        message: "data get succesfully",
      });
    }
  });
});

module.exports = adminHandler;
