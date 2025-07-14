const CustomError = require("../error/customError.js");

const errorHandlerMiddleware = (err, req, res, next) => {
  if(err instanceof CustomError) {
    return res.status(err.statusCode).json({msg: err.message, success: err.success});
  }

  res.status(500).json({msg: "Something error, Please try again later", err});
}

module.exports = errorHandlerMiddleware;