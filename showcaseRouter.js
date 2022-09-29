const express = require("express");
const Showcase = require("./showcaseModel");
const showcaseHandler = express.Router();

showcaseHandler.post("/", (req, res) => {
  const newData = new Showcase(req.body);
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

showcaseHandler.get("/", async (req, res) => {
  await Showcase.find({}).exec((err, data) => {
    if (err) {
      res.status(500).json({
        error: "the server side error",
      });
    } else {
      console.log(data);
      res.status(200).json({
        result: data,
        message: "data get succesfully",
      });
    }
  });
});
showcaseHandler.patch("/update/:id", async (req, res) => {
  Showcase.updateMany(
    { _id: req.params.id },

    {
      $set: {
        weight: req.body.weight,
        draft: req.body.draft,
      },
    },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "the server side error",
        });
      } else {
        res.status(200).json({
          message: "data update succesfully",
        });
      }
    }
  ).clone();
});
// add a new field
showcaseHandler.put("/update", async (req, res) => {
  console.log(req.body);
  await Showcase.updateMany(
    {},
    {
      $set: { weight: req.body.weight },
    },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "the server side error",
        });
      } else {
        res.status(200).json({
          message: "data update succesfully",
        });
      }
    }
  ).clone();
});

module.exports = showcaseHandler;
