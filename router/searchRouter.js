const express = require("express");
const Search = require("../model/searchModel");
const searchHandler = express.Router();
const checkToken = require("../AuthToken/checkAuth");
const { deleteFunction } = require("../utils");
const searchController = require("../controller/searchController");


// post search
searchHandler
  .route("/")
  .post(checkToken, searchController.insetSearchData)
  .get(checkToken, searchController.getSearchData);
// delete search
searchHandler.get("/delete/:id", checkToken, async (req, res) => {
  deleteFunction(Search, req);
  res.redirect("/");
});
searchHandler.post("/test", (req, res) => {
  console.log(req.body.urls.length);
  const wappalyzer = new Wappalyzer();

  (async function () {
    try {
      await wappalyzer.init();

      const results = await Promise.all(
        req.body.urls.map(async (url) => ({
          url,
          results: await wappalyzer.open(url).analyze(),
        }))
      );

      console.log(
        JSON.stringify(
          results.map((d) => d.technologies),
          null,
          2
        )
      );
      res.status(200).json({
        message: "success",
        result: results
      });
    } catch (error) {
      console.error(error);
    }

    await wappalyzer.destroy();
  })();
});

module.exports = searchHandler;
