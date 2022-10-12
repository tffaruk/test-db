const express = require("express");
const dbConnect = require("./dbConnect");
const Testimonial = require("./testimonialModel");
const testimonialHandler = express.Router();

require("dotenv").config();

testimonialHandler.post("/", async (req, res) => {
  await dbConnect();
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
  await dbConnect();
  testimonialHandler;
});

// Update field
testimonialHandler.patch("/update/:id", async (req, res) => {
  await dbConnect();
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

testimonialHandler.put("/update", async (req, res) => {
  await dbConnect();

  const dataArray = req.body.draftData.map((data, i) => {
    return {
      updateOne: {
        filter: { _id: data._id },
        update: {
          $set: {
            weight: data.weight,
            draft: data.draft,
          },
        },
      },
    };
  });

  await Testimonial.bulkWrite(dataArray, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

testimonialHandler.delete("/delete",(req,res)=>{
  console.log(req.body)
})

module.exports = testimonialHandler;
