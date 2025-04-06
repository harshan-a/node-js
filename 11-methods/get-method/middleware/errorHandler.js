const errorHandlerMiddleware = (err, req, res, next) => {
  res.status(500).json({success: false, msg:"Something error, Please try after sometimes"});
}

module.exports = errorHandlerMiddleware;