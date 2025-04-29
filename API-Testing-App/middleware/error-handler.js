const errorHandlerMiddlerware = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: err.success || false,
    message: err.message || "Something error, please try again later"
  })
}

module.exports = errorHandlerMiddlerware;