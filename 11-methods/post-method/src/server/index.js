const express = require("express"), path = require("path"), fs = require("fs");

const { getUsersData, writeUsersData } = require("./component/writeData.js");
const usersData  = getUsersData();

const app = express(), PORT = 5000;

app.listen(PORT, (err) => {
  err && console.log(err);
  console.log("Server is running on Port 5000...");
})

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
})


app.post("/login", (req, res) => {
  const { name } = req.body;
  if(name) {
    return res.status(200).send("Welcome " + name);
  }
  res.status(502).send("Please, provide credentials");
})

app.post("/api/users", (req, res) => {
  const { name } = req.body;
  if(name) {
    usersData.push({
      userId: usersData.length + 1,
      userName: name
    })
    writeUsersData(usersData);
    return res.status(200).json({ok: true, name});
  }
  res.status(502).json({ok: false, msg: "Please, provide credentials"});
})

app.get("/api/users", (req, res) => {
  res.status(200).json(usersData);
})

app.get("/api/users/:userId", (req, res) => {
  const {userId} = req.params;
  const user = usersData.find(user => Number(userId) === user.userId);
  user 
  ?
  res.status(200).json(user)
  :
  res.status(502).json({ok: false, msg: "Invalid"});
})

