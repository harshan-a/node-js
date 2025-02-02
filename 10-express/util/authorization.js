function authorization(req, res, next) {
  const {user} = req.query;

  if(user) {
    console.log("authorized");
    req.user = {name: user, id: 4};
    next();
    return;
  } 
  console.log("unauthorized entry");
  res.send("unauthorized.");
}

module.exports = authorization;