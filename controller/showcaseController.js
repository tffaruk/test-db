const {
  postRequest,
  websiteCheker,
  updateTrash,
  getTrashData,
} = require("../utils");
const Showcase = require("../model/showcaseModel");

module.exports.postShowcase = async (req, res) => {
  const newData = new Showcase(req.body);
  const showcaseData = await Showcase.find({});
  if (
    showcaseData
      .map((showcase) => websiteCheker(showcase.website))
      .includes(websiteCheker(req.body.website))
  ) {
    res.status(403).json({
      error: "this website already has",
      message: "data already has",
    });
  } else {
    postRequest(newData, req, res);
  }
};

//   getAllShowcaseData
module.exports.getAllShowcase = async (req, res) => {
  const total = await Showcase.find({ trash: false });
  let page = parseInt(req.query.page) - 1 || 0;
  let limit = req.query.limit ? req.query.limit : req.query.page ? 50 : 0;
  let theme = req.query.theme || "";

  if (theme) {
    await Showcase.find({ trash: false })
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
    await Showcase.find({ trash: false })
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

// update showcase data

module.exports.updateShowcase = async (req, res) => {
  const dataArray = req.body.data.map((data) => {
    return {
      updateOne: {
        filter: { _id: data._id },
        update: {
          $set: {
            weight: data.weight,
            draft: data.draft,
            featured: data.featured,
            title: data.title,
            theme: data.theme,
            website: data.website,
            trash: data.trash,
            published: data.published,
            date: !data.date ? "2022-10-25T23:34:53.309Z" : data.date,
          },
        },
      },
    };
  });

  await Showcase.bulkWrite(dataArray, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};

// update trash data
module.exports.getShowcaseTrash = async (req, res) => {
  await getTrashData(req, res, Showcase);
};

// showcase trash update
module.exports.updateShowcaseTrash = async (req, res) => {
  await updateTrash(req, res, Showcase);
};
