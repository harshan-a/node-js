const express = require("express"), path = require("path"), fs = require("fs");

const { getUsersData, writeUsersData } = require("./component/writeData.js");
let usersData  = getUsersData();

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
    const data = {
      userId: usersData[usersData.length - 1].userId + 1,
      userName: name
    };
    usersData.push(data);
    writeUsersData(usersData);
    return res.status(200).json({ok: true, data});
  }
  res.status(502).json({ok: false, msg: "Please, provide credentials"});
})

app.put("/api/users/:id", (req, res) => {
  const {id} = req.params;
  const {userName} = req.body;

  let find;
  usersData.forEach(user => {
    if(user.userId === Number(id)) {
      user.userName = userName;
      find = true;
    }
  })
  if(find) {
    writeUsersData(usersData);
    return res.status(200).send("changed");
  }
  return res.status(503).send("not changed");
})


app.delete("/api/users/:id", (req, res) => {
  const {id} = req.params;
  
  usersData = usersData.filter(user => user.userId !== Number(id));
  writeUsersData(usersData);
  return res.status(200).send("deleted");
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

