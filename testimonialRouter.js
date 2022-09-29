const express = require("express");
const Testimonial = require("./testimonialModel");
const testimonialHandler = express.Router();
const axios = require("axios");
require("dotenv").config();

testimonialHandler.post("/", async (req, res) => {
  const { token } = req.body;

  const data = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
  );

  if (data.data.success) {
    const {
      name,
      company,
      website,
      designation,
      linkedin,
      twitter,
      project,
      feedback,
      usability,
      enjoyed,
      improvement,
      rating,
    } = req.body;
    const dataSet = {
      name: name,
      company: company,
      website: website,
      designation: designation,
      linkedin: linkedin,
      twitter: twitter,
      project: project,
      usability: usability,
      enjoyed: enjoyed,
      improvement: improvement,
      feedback: feedback,
      rating: rating,
    };

    const newData = new Testimonial(dataSet);
    newData.save(dataSet, (error) => {
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
  }
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
