require("dotenv").config();

const TOKEN = process.env.TOKEN;
const checkToken = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = authorization.split(" ")[1];
    if (token == TOKEN) {
      next();
    }
  } catch (error) {
    next("faild fetching");
  }
};

module.exports = checkToken;
