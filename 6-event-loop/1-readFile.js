const fileSystem = require("fs");

console.log("Start the task.");
fileSystem.readFile('../4-buildIn-modules/content/first.txt', "utf-8", (err, res) => {
  if(err) {
    console.log(err);
    return;
  }
  console.log(res);
  console.log("complete the task.");
});

console.log("next task.");