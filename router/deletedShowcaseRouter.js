const express = require("express");
const DeletedShowcase = require("../model/deletedShowcaseModel");
const deletedShowcaseHandler = express.Router();
const checkToken = require("../AuthToken/checkAuth");
const { deleteShowcaseFunction, postRequest } = require("../utils");
const Showcase = require("../model/showcaseModel");

deletedShowcaseHandler.get("/", checkToken, async (req, res) => {
  await DeletedShowcase.find({}).exec((err, data) => {
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

deletedShowcaseHandler.post("/", checkToken, async (req, res) => {
  const newData = await new DeletedShowcase(req.body);
 await newData.save(req.body, (error) => {
    if (error) {
      console.log(error);
      res.status(500).json({
        error: "There is server side error",
      });
    } else {
      res.status(200).json({
        message: "Add data successfully",
      });
    }
  });
 
 
   await deleteShowcaseFunction(Showcase, req);

});

module.exports = deletedShowcaseHandler;
