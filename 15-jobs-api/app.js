require("dotenv").config();
// require("./models/jobModel");

const express = require("express");

const cors = require("cors"); // cross-origin-resource-sharing;
const helmet = require("helmet");
// const xssClean = require("xss-clean");
const {xss} = require("express-xss-sanitizer");
const rateLimiter = require("express-rate-limit");


const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require("./db/connect");

// import middleware
const errorHandlerMiddleware = require("./middleware/errorhandler");
const notFoundMiddleware = require("./middleware/notFound");
const authorizationMiddleware = require("./middleware/auth");

// import routers
const authRouter = require("./routers/authRouter");
const jobsRouter = require("./routers/jobsRouter");



// common middlewares
app.use(express.json());
// app.use(express.static("path"))


// security middlewares
app.use(rateLimiter({
  windowMS: 10 * 60 * 1000, // 10 min
  max: 5, // allow only 5 req for each IP within 10min;
}))
app.use(helmet()); // enhance security by setting various HTTP headers;
app.use(cors({
  origin: "http://localhost:4000"
})) // allow server to server communication;
// app.use(xssClean()); // sanitize the user input such as req.body, req.params, req.query, req.header and so on to prevent from cross-site-scripting(xss). But this xss-clean lib is no longer supported, so we use express-xss-sanitizer;
app.use(xss());


app.get("/", (req, res) => {
  // console.log(req.get("origin"));
  // console.log(req.header("Origin"));
  res.send("hello, world!!!");
})


// routers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authorizationMiddleware, jobsRouter);


// error handling middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


// start server
const start = async () => {
  try {
    const db = await connectDB(process.env.MONGO_URI);
    db && console.log("CONNECTED TO DATABASE");
    
    app.listen(PORT, err => {
      if(err) throw err;
      console.log(`Server is running on port ${PORT}...`);
    })

  } catch(err) {
    console.log(err);
  }
}
start();
