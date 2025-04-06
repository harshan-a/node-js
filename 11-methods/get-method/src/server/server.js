const express = require("express"), path = require("path"), fs = require("fs");
const connectDB = require("../../db/connect.js");
require("dotenv").config({path: "C:/Mine/node-js/11-methods/get-method/.env"});
const qnRoute = require("../../routers/qnRouter.js");
const notFoundMiddleware = require("../../middleware/not-found.js");
const errorHandlerMiddleware = require("../../middleware/errorHandler.js");

const app = express(), PORT = 5000;

//middleware
app.use(express.static("../../public"));
app.use(express.json());


//routes
app.get("/", (req, res) => {
  const indexHTML = path.resolve("../client/index.html");
  res.status(200).sendFile(indexHTML);
})
app.use("/api/questions", qnRoute);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const start = async () => {
  try {
    await connectDB(process.env.MONGO_DB);
    console.log("connected");
    app.listen(PORT, e => {
      e && console.log(e);
    
      console.log("Server is running on Port 5000...");
    });
    
  } catch (err) {
    console.log(err);
  }
}

start();