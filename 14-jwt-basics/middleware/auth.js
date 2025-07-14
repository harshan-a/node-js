const jwt = require("jsonwebtoken");
const {
  UnauthorizedRequest,
} = require("../errors");

const authenticationMiddleware = async (req, res, next) => {
  const {authorization} = req.headers;
  const token = authorization && authorization.split(" ")[1];

  if(!token || token === "null") {
    // throw new CustomError({msg: "No token provided", statusCode: 401})
    return next(new UnauthorizedRequest("No token provided"));
  }

  try {
    const payLoad = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const {id, username} = payLoad;
    req.user = {id, username};
    next();

  } catch(err) {
    next(new UnauthorizedRequest("Not authorized to this route"));
  }
}

module.exports = authenticationMiddleware;