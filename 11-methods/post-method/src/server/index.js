const express = require("express"), path = require("path");
const usersAPI = require("../../router/usersRouter.js");
const loginAPI = require("../../router/loginRouter.js");
const app = express(), PORT = 5000;
const connectDB = require("../../db/connect.js");
require("dotenv").config({path: path.resolve("../../.env")});
const errorHandlerMiddleware = require("../../middleware/error.js");
const notFoundMiddleware = require("../../middleware/not-found.js");


// middleware
app.use(express.static("../../public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// route for "/"
app.get("/", (req, res) => {
  const homePath = path.resolve("../client/index.html");
  res.status(200).sendFile(homePath);
})
// route for "/javascript"
app.get("/javascript", (req, res) => {
  const jsPath = path.resolve("../client/javascript.html");
  res.status(200).sendFile(jsPath);
});

//router api
app.use("/login", loginAPI);
app.use("/api/users", usersAPI);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const start = async () => {
  try {
    await connectDB(process.env.MONGO_DB);
    console.log("CONNECTED TO DATABASE");
    app.listen(PORT, (err) => {
      err && console.log(err);
      console.log("Server is running on Port 5000...");
    })

  } catch(err) {
    console.log(err);
  }
}
start();