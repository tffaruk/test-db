const postRequest = (Data, req, res) => {
  Data.save(req.body, (error) => {
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
};

const websiteCheker = (website) => {
  const url = new URL(website).host.replace("www.", " ");
  return url;
};

const sortByFrequency = (array) => {
  let objectData = {};
  let newArr = [];

  array.map((d) => {
    objectData[d] ? (objectData[d] += 1) : (objectData[d] = 1);
  });

  for (let key in objectData) {
    newArr.push({
      value: key,
      number: objectData[key],
    });
  }
  newArr.sort((a, b) => b.number - a.number);
  return newArr;
};

const deleteFunction = (Model, req) => {
  Model.deleteOne({ _id: req.params.id }, (err, data) => {
    if (!err) {
      console.log("member successfully deleted");
    } else {
      console.log(err);
    }
  });
};

// delete showcase which are moved or not exist
const deleteShowcaseFunction = async(Model, req) => {
  Model.deleteOne({ website: req.body.website }, (err, data) => {
    if (!err) {
      console.log("member successfully deleted");
    } else {
      console.log(err);
    }
  });
};

const getTrashData = async (req, res, Showcase) => {
  await Showcase.find({ trash: true }).exec((err, data) => {
    if (err) {
      res.status(500).json({
        error: "the server side error",
      });
    } else {
      res.status(200).json({
        result: data,
        message: "data get succesfully",
        isEmpty: data.length > 0 ? false : true,
      });
    }
  });
};

const updateTrash = async (req, res, Model) => {
  const data = req.body.updateTrash.filter((data) => data.id);

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

  await Model.bulkWrite(dataArray, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};

module.exports = {
  postRequest,
  websiteCheker,
  sortByFrequency,
  deleteFunction,
  updateTrash,
  getTrashData,
  deleteShowcaseFunction,
};
