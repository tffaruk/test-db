const express = require("express");
const Showcase = require("../model/showcaseModel");
const showcaseHandler = express.Router();
const checkToken = require("../AuthToken/checkAuth");
const { deleteFunction } = require("../utils");
const showcaseController = require("../controller/showcaseController");

//  insert and get showcase data
showcaseHandler
  .route("/")
  .post( showcaseController.postShowcase)
  .get( showcaseController.getAllShowcase);

// update Showcase data
showcaseHandler.put("/update", checkToken, showcaseController.updateShowcase);

// get and update trash data
showcaseHandler
  .route("/trash")
  .get(checkToken, showcaseController.getShowcaseTrash)
  .put(checkToken, showcaseController.updateShowcaseTrash);

// delete download field
showcaseHandler.get("/delete/:id", checkToken, async (req, res) => {
  deleteFunction(Showcase, req);
  res.redirect("/");
});

module.exports = showcaseHandler;
