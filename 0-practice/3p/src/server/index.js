const express = require("express"), path = require("path");

const app = express(), PORT = 5000;

const { 
  getUserData, 
  postUserData, 
  changeUserPassword,
  deleteUser
} = require("./component/user_operation.js");


app.listen(PORT, (e) => {
  e && console.log(e);

  console.log("Server is running on Port 5000...");
})

app.use(express.static("../../public"));
app.use(express.json());


app.get("/", (req, res) => {
  const indexHTML = path.resolve("../client/index.html");
  res.status(200).sendFile(indexHTML);
})


app.get("/forgetpassword", (req, res) => {
  const forgetpasswardHTML = path.resolve("../client/forgetpassword.html");
  res.status(200).sendFile(forgetpasswardHTML);
})


app.get("/api/login/:username/:password", (req, res) => {
  const {params} = req;
  const userData = getUserData(params);
  if(userData === "USER_NOT_FOUND") {
    res.status(503).json({success: false, data: "USER_NOT_FOUND"});
    return;

  } else if(userData === "PASSWORD_INCORRECT") {
    res.status(401).json({success: false, data: "PASSWORD_INCORRECT"});
    return;
  
  } 
  res.status(200).json({success: true, data: userData});
})


app.post("/api/signup", (req, res) => {
  const { body } = req;
  const data = postUserData(body);
  if(data === "INVALID_DATA") {
    res.status(502).json({success: false, data: "INVALID_DATA"});
    return;

  } else if(data === "ALREADY_A_MEMBER") {
    res.status(502).json({success: false, data: "ALREADY_A_MEMBER"});
    return;
  }
  res.status(200).json({success: true, data});  
})


app.put("/api/change/:username", (req, res) => {
  const {username} = req.params;
  const {passward} = req.body;
  const data = changeUserPassword({username, passward});

  if(data === "USER_NOT_FOUND") {
    res.status(503).json({success: false, data});
    return;
  }
  res.status(200).json({success: true, data});
})

app.delete("/api/delete/:username", (req, res) => {
  const {username} = req.params;
  const data = deleteUser(username);

  if(data === "USER_NOT_FOUND") {
    res.status(503).json({success: false, data});
    return;
  }
  res.status(200).json({success: true, data});
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