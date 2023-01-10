const express = require("express");
const Request = require("../model/requestModel");
const requestHandler = express.Router();

requestHandler.post("/", (req, res) => {
  const newData = new Request(req.body);
  newData.save(req.body, (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        error: "There is server side error",
      });
    } else {
      res.status(200).json({
        message: "Add data successfully",
      });
    }
  });
});

requestHandler.get("/", async (req, res) => {
  await Request.find({}).exec((err, data) => {
    if (err) {
      res.status(500).json({
        error: "the server side error",
      });
    } else {
      res.status(200).json({
        result: data,
        isEmpty: data.length > 0 ? false : true,
        message: "data get succesfully",
      });
    }
  });
});

module.exports = requestHandler;
