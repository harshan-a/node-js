const express = require("express"), path = require("path"), fs = require("fs");

const usersAPI = require("../../router/usersRouter.js");
const loginAPI = require("../../router/loginRouter.js");

const app = express(), PORT = 5000;

app.listen(PORT, (err) => {
  err && console.log(err);
  console.log("Server is running on Port 5000...");
})

// middleware
app.use(express.static("../../public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//router api
app.use("/api/users", usersAPI);
app.use("/login", loginAPI);



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