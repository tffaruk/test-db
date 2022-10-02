const express = require("express");
const dbConnect = require("./dbConnect");
const Showcase = require("./showcaseModel");
const showcaseHandler = express.Router();

showcaseHandler.post("/", async (req, res) => {
  await dbConnect();
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
  await dbConnect();
  var bulkOp = Showcase.initializeUnorderedBulkOp();
  await bulkOp
    .updateOne(
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
    )
    .clone();
});

showcaseHandler.put("/update", async (req, res) => {
  await dbConnect();

  // console.log(req.body.draft);

  await Showcase.updateMany(
    { _id: req.body.id },

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

module.exports = showcaseHandler;
