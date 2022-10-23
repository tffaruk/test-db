const express = require("express");
const dbConnect = require("./dbConnect");
const Admin = require("./adminModel");
const adminHandler = express.Router();

adminHandler.post("/", async (req, res) => {
  console.log(req.body);
  await dbConnect();
  const newData = new Admin(req.body);
  newData.save(req.body, (error) => {
    if (error) {
      console.log(error);
      res.status(500).json({
        error: "There is server side error",
      });
    } else {
      res.status(200).json({
        message: "Add user successfully",
      });
    }
  });
});

adminHandler.get("/", async (req, res) => {
  await dbConnect();
  await Admin.find({}).exec((err, data) => {
    if (err) {
      res.status(500).json({
        error: "the server side error",
      });
    } else {
      res.status(200).json({
        result: data,
        message: "data get succesfully",
      });
    }
  });
});
adminHandler.get("/delete/:id", async (req, res) => {
  await dbConnect();

  Admin.deleteOne({ _id: req.params.id }, (err, data) => {
    if (!err) {
      console.log(data);

      console.log("member successfully deleted");
    } else {
      console.log(err);
    }
  });
  res.redirect("/");
});

adminHandler.put("/update", async (req, res) => {
  await dbConnect();

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
});
module.exports = adminHandler;
