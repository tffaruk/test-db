const Admin = require("../model/adminModel");
const { postRequest } = require("../utils");

module.exports.getAllAdmin = async (req, res) => {
  await Admin.find({}).exec((err, data) => {
    if (err) {
      res.status(500).json({
        error: "the server side error",
      });
    } else {
      res.status(200).json({
        result: data,
        isEmpty: data.length > 0 ? false : true,
        message: "data get succesfully",
      });
    }
  });
};

// post Admin
module.exports.insertAdmin = async (req, res) => {
  const newData = new Admin(req.body);
  postRequest(newData, req, res);
};

// update Admin
module.exports.updateAdmin = async (req, res) => {
  const dataArray = req.body.data.map((data, i) => {
    return {
      updateOne: {
        filter: { _id: data._id },
        update: {
          $set: {
            weight: data.weight,
            role: data.role,
          },
        },
      },
    };
  });

  await Admin.bulkWrite(dataArray, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};
