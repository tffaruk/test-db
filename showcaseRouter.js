const express = require("express");
const dbConnect = require("./dbConnect");
const Showcase = require("./showcaseModel");
const showcaseHandler = express.Router();

require("dotenv").config();

showcaseHandler.post("/", async (req, res) => {
  console.log(req.body);
  await dbConnect();
  const newData = new Showcase(req.body);
  newData.save(req.body, (error) => {
    if (error) {
      console.log(error);
      res.status(500).json({
        error: "There is server side error",
      });
    } else {
      res.status(200).json({
        message: "Add data successfully",
      });
    }
  });
});

showcaseHandler.get("/", async (req, res) => {
  await dbConnect();
  await Showcase.find({ trash: false }).exec((err, data) => {
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

showcaseHandler.put("/update", async (req, res) => {
  await dbConnect();

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
            published: !data.draft,
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
});
// trash undo

// get trash data
showcaseHandler.get("/trash", async (req, res) => {
  await Showcase.find({ trash: true }).exec((err, data) => {
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

// undo trash
showcaseHandler.put("/trash", async (req, res) => {
  await dbConnect();
  const data = req.body.updateTrash.filter((data) => data.id);
  console.log(data);
  const dataArray = data.map((data) => {
    return {
      updateOne: {
        filter: { _id: data.id },
        update: {
          $set: {
            trash: data.trash,
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
});

//
// delete download field
showcaseHandler.get("/delete/:id", async (req, res) => {
  await dbConnect();
  console.log(req.params.id);
  Showcase.deleteOne({ _id: req.params.id }, function (err, data) {
    if (!err) {
      console.log(data);

      console.log("member successfully deleted");
    } else {
      console.log(err);
    }
  });
  res.redirect("/");
});

module.exports = showcaseHandler;

//   console.log(req.body.draft);

//   await Showcase.updateMany(
//     {},

//     {
//       $set: {
//         weight: req.body.weight,
//         draft: req.body.draft,
//       },
//     },
//     (err) => {
//       if (err) {
//         res.status(500).json({
//           error: "the server side error",
//         });
//       } else {
//         res.status(200).json({
//           message: "data update succesfully",
//         });
//       }
//     }
//   ).clone())}

//   // await Showcase.bulkWrite(
//   //   [
//   //     {
//   //       updateMany: {
//   //         filter: { _id: req.body.id },
//   //         update: {
//   //           $set: {
//   //             weight: req.body.weight,
//   //             draft: req.body.draft,
//   //           },
//   //         },
//   //       },
//   //     },
//   //   ],
//   //   function (err, result) {
//   //     if (err) {
//   //       res.send(err);
//   //     } else {
//   //       res.send(result);
//   //     }
//   //   }
//   // );
// });

// myteam.bulkWrite(
//   [

//     {
//       updateOne: {
//         filter: { name: "Eden Hazard" },
//         update: {
//           $set: {
//             country: "Belgium"
//           }
//         }
//       }
//     },

//   ]
// );

// add a new field
