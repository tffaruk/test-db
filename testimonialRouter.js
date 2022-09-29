const express = require("express");
const Testimonial = require("./testimonialModel");
const testimonialHandler = express.Router();

require("dotenv").config();

testimonialHandler.post("/", async (req, res) => {
  const newData = new Testimonial(req.body);
  newData.save(req.body, (error) => {
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
});

testimonialHandler.get("/", async (req, res) => {
  await Testimonial.find({}).exec((err, data) => {
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

// Update field
testimonialHandler.patch("/update/:id", async (req, res) => {
  Testimonial.updateOne(
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

module.exports = testimonialHandler;
