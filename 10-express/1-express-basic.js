/*
const express = require("express"), path = require("path");

const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname,  'package.json'));
});

// console.log();
app.listen(5000);
*/


/*
const express = require("express"), path = require("path");

const app = express();


app.get("/", (req, res) => {
  res.status(200).sendFile(path.resolve('../0-practice/1p/index.html'));
});

app.get("/about", (req, res) => {
  res.status(200);
  res.sendFile(path.resolve("../0-practice/1p/about.html"));
})

app.all("*", (req, res) => {
  res.status(404)
  res.send("not found")
})

app.listen(5000, () => {
  console.log("Server is running on Port 5000...");
})
*/


const express = require("express"), path = require("path");

const app = express();

app.use(express.static("./public"));
// express.static() is used to serve the static files like style.css, image.jpg 
// if the req a file , if that file is in public folder it serve directly to client otherwise req gives to route handler like app.get();

app.get("/", (req, res) => {
  res.status(200);
  res.sendFile(path.resolve("../0-practice/2p/index.html"));
});

app.get("/about.html", (req, res) => {
  res.status(200);
  res.sendFile(path.resolve("../0-practice/2p/about.html"));
});

app.get("/project.html", (req, res) => {
  res.status(200);
  res.sendFile(path.resolve("../0-practice/2p/project.html"));
});

app.get("/contact.html", (req, res) => {
  res.status(200);
  res.sendFile(path.resolve("../0-practice/2p/contact.html"));
});

app.all("*", (req, res) => {
  res.status(404).sendFile(path.resolve("../0-practice/2p/error.html"));
})


app.listen(5000, () => {
  console.log("Server is running on Port 5000....");
})
