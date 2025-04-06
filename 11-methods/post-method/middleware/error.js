const errorHandlerMiddleware = (err, req, res, next) => {
  res.status(err.status || 500).json({ok: false, msg: err.message, err});
}

module.exports = errorHandlerMiddleware;