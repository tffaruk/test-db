const BundleReview = require("../model/bundleReviewModel");
const { postRequest, getTrashData, updateTrash } = require("../utils");

module.exports.getAllBundleReview = async (req, res) => {
  const total = await BundleReview.find({ trash: false });
  let page = parseInt(req.query.page) - 1 || 0;
  let limit = req.query.limit ? req.query.limit : 50;
  await BundleReview.find({ trash: false })
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
};

// post BundleReview
module.exports.insertBundleReview = async (req, res) => {
  console.log(req.body);
  const newData = new BundleReview(req.body);
  const total = await BundleReview.find({ trash: false });
  if (total.map((data) => data.email).includes(req.body.email)) {
    {
      res.status(403).json({
        error: "this data already exist",
      });
    }
  } else {
    postRequest(newData, req, res);
  }
};

// update BundleReview
module.exports.updateBundleReview = async (req, res) => {
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

  await BundleReview.bulkWrite(dataArray, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};

// get BundleReview trash data
module.exports.getBundleReviewTrash = async (req, res) => {
  getTrashData(req, res, BundleReview);
};

// update BundleReview trash
module.exports.updateBundleReviewTrash = async (req, res) => {
  updateTrash(req, res, BundleReview);
};
