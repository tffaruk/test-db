const Testimonial = require("../model/testimonialModel");
const { postRequest, getTrashData, updateTrash } = require("../utils");

module.exports.getAllTestimonial = async (req, res) => {
  const total = await Testimonial.find({ trash: false });
  let page = parseInt(req.query.page) - 1 || 0;
  let limit = req.query.limit ? req.query.limit : 50;

  await Testimonial.find({ trash: false })
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

// post testimonial
module.exports.insertTestimonial = async (req, res) => {
  const newData = new Testimonial(req.body);
  postRequest(newData, req, res);
};

// update testimonial
module.exports.updateTestimonial = async (req, res) => {
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
};

// get testimonial trash data
module.exports.getTestimonialTrash = async (req, res) => {
  getTrashData(req, res, Testimonial);
};

// update testimonial trash
module.exports.updateTestimonialTrash = async (req, res) => {
  updateTrash(req, res, Testimonial);
};
