const Review = require("../model/reviewModel");
const { postRequest, getTrashData, updateTrash } = require("../utils");

module.exports.getAllReview = async (req, res) => {
  const total = await Review.find({ trash: false });
  let page = parseInt(req.query.page) - 1 || 0;
  let limit = req.query.limit ? req.query.limit : 50;
  let theme = req.query.theme || "";
  if (theme) {
    await Review.find({ trash: false })
      .where("theme")
      .in(theme)
      .sort({ weight: 1 })
      .sort({ date: "descending" })
      .skip(page * limit)
      .limit(limit)
      .exec((err, data) => {
        if (err) {
          res.status(500).json({
            error: "the server side error",
          });
        } else {
          res.status(200).json({
            result: data,
            message: "data get succesfully",
            total: total.length / limit,
            isEmpty: data.length > 0 ? false : true,
          });
        }
      });
  } else {
    await Review.find({ trash: false })
      .sort({ weight: 1 })
      .sort({ date: "descending" })
      .skip(page * limit)
      .limit(limit)
      .exec((err, data) => {
        if (err) {
          res.status(500).json({
            error: "the server side error",
          });
        } else {
          res.status(200).json({
            result: data,
            isEmpty: data.length > 0 ? false : true,
            message: "data get succesfully",
            total: total.length / limit,
          });
        }
      });
  }
};

// post Review
module.exports.insertReview = async (req, res) => {
  const newData = new Review(req.body);
  const total = await Review.find({ trash: false });

  if (total.map((data) => data.theme).includes(req.body.theme)) {
    if (
      (req.body.github &&
        total.map((data) => data.github).includes(req.body.github)) ||
      (req.body.email &&
        total.map((data) => data.email).includes(req.body.email))
    ) {
      {
        res.status(403).json({
          error: "this data already exist",
        });
      }
    } else {
      postRequest(newData, req, res);
    }
  } else {
    postRequest(newData, req, res);
  }
};

// update Review
module.exports.updateReview = async (req, res) => {
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
};

// get Review trash data
module.exports.getReviewTrash = async (req, res) => {
  getTrashData(req, res, Review);
};
// update Review trash
module.exports.updateReviewTrash = async (req, res) => {
  updateTrash(req, res, Review);
};
