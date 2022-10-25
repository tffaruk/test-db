const express = require("express");
const dbConnect = require("./dbConnect");
const Review = require("./reviewModel");
const Showcase = require("./showcaseModel");
const reviewHandler = express.Router();
require("dotenv").config();

reviewHandler.post("/", async (req, res) => {
  await dbConnect();

  const newData = new Review(req.body);
  newData.save(req.body, (error) => {
    if (error) {
      console.log(error);
      res.status(500).json({
        error: "There is server side error",
      });
    } else {
      if (req.body.website) {
        Showcase.find({}).exec((err, data) => {
          if (err) {
            console.log(err);
            res.status(500).json({
              error: "There is server side error",
            });
          } else {
            if (!data.map((data) => data.website).includes(req.body.website)) {
              const event = {
                title: req.body.websiteTitle,
                website: req.body.website,
                theme: req.body.theme,
                slug: req.body.websiteTitle.toLowerCase(),
                featured: false,
                published: false,
                trash: false,
                weight: 0,
              };
              const newData = new Showcase(event);
              newData.save(event);
            }
          }
        });
      }
      res.status(200).json({
        message: "Add data successfully",
      });
    }
  });
});

reviewHandler.get("/", async (req, res) => {
  await dbConnect();

  let theme = req.query.theme || "";

  theme =
    theme === ""
      ? ""
      : req.query.theme.charAt(0).toUpperCase() + req.query.theme.slice(1);

  if (theme) {
    await Review.find({ trash: false })
      .where("theme")
      .in(theme)
      .exec((err, data) => {
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
  } else {
    await Review.find({ trash: false }).exec((err, data) => {
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
  }
});

// Update field
reviewHandler.put("/update", async (req, res) => {
  await dbConnect();
  const dataArray = req.body.data.map((data) => {
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

  await Review.bulkWrite(dataArray, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

reviewHandler.get("/trash", async (req, res) => {
  await dbConnect();
  await Review.find({ trash: true }).exec((err, data) => {
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
reviewHandler.put("/trash", async (req, res) => {
  await dbConnect();
  const data = req.body.updateTrash.filter((data) => data.id);
  // console.log(data);
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

  await Review.bulkWrite(dataArray, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

// delete Review
reviewHandler.get("/delete/:id", async (req, res) => {
  await dbConnect();

  Review.deleteOne({ _id: req.params.id }, (err, data) => {
    if (!err) {
      console.log(data);

      console.log("member successfully deleted");
    } else {
      console.log(err);
    }
  });
  res.redirect("/");
});

module.exports = reviewHandler;
