const Search = require("../model/searchModel");
const { sortByFrequency, postRequest } = require("../utils");

// get search data
module.exports.getSearchData = async (req, res) => {
  await Search.find({}).exec((err, data) => {
    if (err) {
      res.status(500).json({
        error: "the server side error",
      });
    } else {
      res.status(200).json({
        result: sortByFrequency(data.map((d) => d.key.split(",")).flat(1)),
        searchData: data,
        message: "data get succesfully",
      });
    }
  });
};

// insert search data
module.exports.insetSearchData = (req, res) => {
  const newData = new Search(req.body);
  postRequest(newData, req, res);
};
