const express = require("express");
const dbConnect = require("./dbConnect");
const Testimonial = require("./testimonialModel");
const testimonialHandler = express.Router();

require("dotenv").config();

testimonialHandler.post("/", async (req, res) => {
  console.log(req.body);
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
// get all data
testimonialHandler.get("/", async (req, res) => {
  await dbConnect();
  await Testimonial.find({ trash: false }).exec((err, data) => {
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
// get trash data
testimonialHandler.get("/trash", async (req, res) => {
  await dbConnect();
  await Testimonial.find({ trash: true }).exec((err, data) => {
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

// update testimonial
testimonialHandler.put("/update", async (req, res) => {
  await dbConnect();

  const dataArray = req.body.data.map((data, i) => {
    return {
      updateOne: {
        filter: { _id: data._id },
        update: {
          $set: {
            weight: data.weight,
            published: data.published,
            trash: data.trash,
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

// undo trash
testimonialHandler.put("/trash", async (req, res) => {
  await dbConnect();
  const data = req.body.updateTrash.filter((data) => data.id);
  console.log(data);
  const dataArray = data.map((data) => {
    return {
      updateOne: {
        filter: { _id: data.id },
        update: {
          $set: {
            trash: data.trash,
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

// delete testimonial
testimonialHandler.get("/delete/:id", async (req, res) => {
  await dbConnect();

  Testimonial.deleteOne({ _id: req.params.id }, (err, data) => {
    if (!err) {
      console.log(data);

      console.log("member successfully deleted");
    } else {
      console.log(err);
    }
  });
  res.redirect("/");
});

module.exports = testimonialHandler;
