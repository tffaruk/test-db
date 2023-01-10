const express = require("express");
const Testimonial = require("../model/testimonialModel");
const testimonialHandler = express.Router();
require("dotenv").config();
const checkToken = require("../AuthToken/checkAuth");
const { deleteFunction } = require("../utils");
const testimonialController = require("../controller/testimonialController");

// get and post testimonial
testimonialHandler
  .route("/")
  .post(checkToken, testimonialController.insertTestimonial)
  .get(checkToken, testimonialController.getAllTestimonial);

// Update field
testimonialHandler.patch("/update/:id", checkToken, async (req, res) => {
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
testimonialHandler.put(
  "/update",
  checkToken,
  testimonialController.updateTestimonial
);

// update and get testimonial data
testimonialHandler
  .route("/trash")
  .put(checkToken, testimonialController.updateTestimonialTrash)
  .get(checkToken, testimonialController.getTestimonialTrash);

// delete testimonial
testimonialHandler.get("/delete/:id", checkToken, async (req, res) => {
  deleteFunction(Testimonial, req);
  res.redirect("/");
});

module.exports = testimonialHandler;
