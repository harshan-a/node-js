function logger(req, res, next) {
  const 
  method = req.method,
  url = req.url,
  dateYear = new Date().getFullYear();
  console.log(method, url, dateYear);
  next();
}

function logger2(req, res, next) {
  console.log("next middleware");
  next();
}

module.exports = {
  logger, logger2
}