const notFoundMiddleware = (req, res, next) => {
  res.status(404).send("not-found 404");
}

module.exports = notFoundMiddleware;