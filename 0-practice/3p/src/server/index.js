const express = require("express"), path = require("path");

const app = express(), PORT = 5000;

const userOperationAPI = require("../../router/apiRouter");


app.use(express.static("../../public"));
app.use(express.json());

app.use("/api", userOperationAPI);



app.listen(PORT, (e) => {
  e && console.log(e);

  console.log("Server is running on Port 5000...");
})


app.get("/", (req, res) => {
  const indexHTML = path.resolve("../client/index.html");
  res.status(200).sendFile(indexHTML);
})

app.get("/forgetpassword", (req, res) => {
  const forgetpasswardHTML = path.resolve("../client/forgetpassword.html");
  res.status(200).sendFile(forgetpasswardHTML);
})

app.get("/success", (req, res) => {
  const {name} = req.query;
  const successHTML = path.resolve("../client/success.html");
  const errorHTML = path.resolve("../client/error.html");

  if(name) {
    res.status(200).sendFile(successHTML);
    return;
  }
  res.status(404).sendFile(errorHTML);
})