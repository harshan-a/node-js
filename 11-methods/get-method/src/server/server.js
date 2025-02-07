const express = require("express"), path = require("path"), fs = require("fs");
const app = express(), PORT = 5000;


app.use(express.static("../../public"));

app.get("/", (req, res) => {
  const indexHTML = path.resolve("../client/index.html");
  res.status(200).sendFile(indexHTML);
})


app.get("/api/questions", (req, res) => {
  const fileData = fs.readFileSync("../../data/questionsData.json", "utf-8");
  const questionsData = JSON.parse(fileData);
  res.status(200).json(questionsData);
})

app.listen(PORT, e => {
  e && console.log(e);

  console.log("Server is running on Port 5000...");
});