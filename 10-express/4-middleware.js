const express = require("express"), path = require("path"),
morgan = require("morgan");

const logObj = require("./util/middleware-logger.js");
const authorization = require("./util/authorization.js");

// req => middleware => res;
// middleware place inbetween req, res 
// middleware is a function, it will exected before response to the request 
// middleware have access to both the req and the res;
// In middleware function, next()  must be called, to go to next middleware function or trigger the response.
// there can be n-number of middlewares like chain, that execute one after another.
// req->mw1->mw2->mw3->mw4...->res; 


/*
module.exports = function start() {
  const app = express();

  app.get("/", logObj.logger, logObj.logger2, (req, res) => {
    res.send("<h1>Home Page</h1>");
  })

  app.get("/about", logObj.logger, logObj.logger2, (req, res) => {
    res.send("<h1>About Page</h1>");
  })
  
  app.listen(5000, function() {
    console.log("Server is running on Port 5000....");
  })
}
*/


/*
module.exports = function start(products) {
  const app = express();

  //instead of call the middleware in each route, express provide a method called app.use(path, function), which is used to call the middleware function for all req or route matchs the path;

  // app.use([logObj.logger, logObj.logger2]);
  app.use("/api", [logObj.logger, logObj.logger2]);

  app.get("/", (req, res) => {
    res.send("<h1>Home page</h1>");
  })

  app.get("/about", (req, res) => {
    res.send("<h1>About page</h1>");
  })

  app.get("/api/products", (req, res) => {
    res.json(products);
  })
  app.get("/api/product", (req, res) => {
    res.json(products[0]);
  })

  app.listen(5000, (err) => {
    err && console.log(err);

    console.log("Server is running on Port 5000....");
  })
}
*/


module.exports = function start() {
  const app = express();


  // middleware can be three ways:
  // 1 - our own function like logger, logger2, authorization etc...
  // 2 - express's buildin one like express.static("./public")...
  // 3 - third party like morgan()

  app.use([authorization, logObj.logger, logObj.logger2]);
  app.use(express.static("./public"));
  app.use(morgan("tiny"));
  // app.use(morgan("combined"));
  

  app.get("/", (req, res) => {
    console.log("user:", req.user);
    res.send("home page");
  })
  
  app.get("/about", (req, res) => {
    res.send("about page");
  })

  app.listen(5000, (err) => {
    err && console.log(err);

    console.log("Server is running on Port 5000...");
  })
}