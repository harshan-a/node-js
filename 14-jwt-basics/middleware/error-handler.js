const CustomError = require("../errors/customError.js");
const {StatusCodes} = require("http-status-codes");


const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  if(err instanceof CustomError) {
    return res.status(err.statusCode).json({msg: err.message});
  }

  if (err.name === 'ValidationError') {
    // const fields = ["username", "password"];
    // for(const field in obj = err.errors) {
    //   if(fields.includes(field)) {
    //     return res
    //       .status(StatusCodes.UNPROCESSABLE_ENTITY)
    //       .json({msg: obj[field].message || "Something error on validation...", err});
    //   }
    // }
    const {message} = Object.values(err.errors)[0];
    return res
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({msg: message || "Something error on validation...", err});
    // console.log(Object.values(err.errors)[0].message);

  }


  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({msg: err.message || "Something went wrong, please try again later...", err});
}

module.exports = errorHandlerMiddleware;